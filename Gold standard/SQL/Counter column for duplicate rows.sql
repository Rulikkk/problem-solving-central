/*Assume you have table:

ID	Type	Color
1	dog	black
2	cat	gray
3	dog	white
4	fox	red
5	dog	black
Need to add "Counter" column and remove duplicated rows:

Result
ID	Type	Color	Counter
1	dog	black	2
2	cat	gray	1
3	dog	white	1
4	fox	red	    1
*/

/*Building schema*/
CREATE TABLE Animals (`Id` int, `Type` varchar(10), `Color` varchar(10));
INSERT INTO
   Animals (`Id`, `Type`, `Color`) 
VALUES
   (1, 'dog', 'black'), 
   (2, 'cat', 'gray'), 
   (3, 'dog', 'white'), 
   (3, 'fox', 'red'), 
   (3, 'dog', 'black');

/*Solution*/
SELECT
   Id,
   Type,
   Color,
   COUNT(Type) as Count 
FROM
   Animals 
GROUP BY
   Type,
   Color 
ORDER BY
   Count DESC;





