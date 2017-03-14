A table, refreshed once per day with actual values: (clusterID; nodeID; manufacturer).

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
