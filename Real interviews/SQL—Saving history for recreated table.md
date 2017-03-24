A table, refreshed once per day at 7am with actual values: (clusterID; nodeID; manufacturer).

```
day 1:
cluster1, node1, M1
cluster1, node2, M1
 
day 2:
cluster1, node2, M1
cluster2, node1, M2

day 3... day50
```

Each node is identified with nodeId and clusterId. Need to design sql system to be able to answer questions:
 
1. What are the nodes we newly added in past 10 days?
2. What are the first 10 nodes we removed since day 1?

#1. Necessary preparations:

Assume that we have the following table:

CREATE TABLE ClusterNodeData(
	ClusterId INT, 
	NodeId INT, 
	Manufacturer VARCHAR(42),
	CONSTRAINT UQ_ClusterNodeId UNIQUE (ClusterId, NodeId)
);

Is was proposed, to save previous snapshot of the table. It is possible to update this table at 6am with actual values.

CREATE TABLE SnapshotClusterNodeData(
	ClusterId INT, 
	NodeId INT, 
	Manufacturer VARCHAR(42),
	CONSTRAINT PK_InputClusterNodeId PRIMARY KEY CLUSTERED(ClusterId, NodeId)
);

Values are not present in the new data will be considered as deleted. Values are not present in the old data will be considered as added. For now, we can easily calculate newly added and deleted items like that:

SELECT 
		A.*
	FROM SnapshotClusterNodeData AS A
	WHERE NOT EXISTS (SELECT 1 FROM ClusterNodeData WHERE ClusterId = A.ClusterId AND NodeId = A.NodeId);

Or we can use similar query (for educational purposes):

SELECT S.*
FROM
(
	SELECT A.* FROM SnapshotClusterNodeData AS A
		EXCEPT
	SELECT B.* FROM ClusterNodeData AS B
) AS S

Or you can use:

SELECT 
		A.*
	FROM SnapshotClusterNodeData AS A
	LEFT OUTER JOIN ClusterNodeData AS B ON A.ClusterId = B.ClusterId AND A.NodeId = B.NodeId
	WHERE B.ClusterId IS NULL;

Added items calculated in the same manner:

SELECT 
		B.*
	FROM ClusterNodeData AS B
	WHERE NOT EXISTS (SELECT 1 FROM SnapshotClusterNodeData WHERE ClusterId = B.ClusterId AND NodeId = B.NodeId);
 
 Or you can use:
 
SELECT S.*
FROM
(
	SELECT B.* FROM ClusterNodeData AS B
		EXCEPT
	SELECT A.* FROM SnapshotClusterNodeData AS A
) AS S

SELECT 
		B.*
	FROM ClusterNodeData AS B
	LEFT OUTER JOIN SnapshotClusterNodeData AS A ON A.ClusterId = B.ClusterId AND A.NodeId = B.NodeId
	WHERE A.ClusterId IS NULL;
 
It is necessary to paste actual data into the some history table. Declare the following table:

CREATE TABLE ClusterNodeStateHistory(
	ClusterId INT, 
	NodeId INT,
	[Date] Date, -- operation date
	NodeState BIT -- 0-delted, 1-added
);

-- Add or Update 'deleted' nodes

MERGE INTO ClusterNodeStateHistory AS trg
USING
(
SELECT 
		A.ClusterId, A.NodeId 
	FROM SnapshotClusterNodeData AS A
	WHERE NOT EXISTS (SELECT 1 FROM ClusterNodeData WHERE ClusterId = A.ClusterId AND NodeId = A.NodeId)
) AS src(ClusterId, NodeId) ON (trg.ClusterId = src.ClusterId AND trg.NodeId = src.NodeId) -- searching for equal nodes
WHEN MATCHED THEN 
	UPDATE SET [Date] = GETDATE(), NodeState = 0 -- set node state to deleted and set operation date
WHEN NOT MATCHED THEN
	INSERT (ClusterId, NodeId, [Date], NodeState)
		VALUES (src.ClusterId, src.NodeId, GETDATE(), 0); -- insert newly deleted nodes

-- Add or update 'added' nodes

MERGE INTO ClusterNodeStateHistory AS trg
USING
(
SELECT 
		B.ClusterId, B.NodeId
	FROM ClusterNodeData AS B
	WHERE NOT EXISTS (SELECT 1 FROM SnapshotClusterNodeData WHERE ClusterId = B.ClusterId AND NodeId = B.NodeId)
) AS src(ClusterId, NodeId) ON (trg.ClusterId = src.ClusterId AND trg.NodeId = src.NodeId) -- searching for equal nodes
WHEN MATCHED THEN 
	UPDATE SET [Date] = GETDATE(), NodeState = 1 -- set node state to added and set operation date
WHEN NOT MATCHED THEN
	INSERT (ClusterId, NodeId, [Date], NodeState)
		VALUES (src.ClusterId, src.NodeId, GETDATE(), 1); -- insert newly added nodes
  
  
 #2. Queries
 
Well done, we able to give answers to the following questions:

1. "What are the nodes was newly added in past N days?"

DECLARE @N int = 10;
SELECT * FROM ClusterNodeStateHistory WHERE [Date] > DATEADD(D,-@N, GETDATE()) AND NodeState = 1;

2. "What are the first N nodes we removed since day 1?"

DECLARE @N int = 10;
SELECT TOP(@N) * FROM ClusterNodeStateHistory WHERE ActionType = 0 ORDER BY [Date] DESC;
