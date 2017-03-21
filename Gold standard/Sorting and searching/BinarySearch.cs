       /* Problem: Given sorted array and X, please find the position of X in the array
          Solution: Binary Search
          Lang: C#
       */

       private static int BinarySerch(int[] array, int target)
        {
            int start = 0;
            int end = array.Length-1;
            int middle;
            while (start<=end)
            {
                middle = start + (end - start) / 2;
                if (target > array[middle])
                {
                    start  =middle + 1;
                }
                else if (target < array[middle])
                {
                    end = middle - 1;
                }
                else
                {
                    return middle;
                }
            }
            return -1;
        }

        private static int[] GetRundomArray()
        {
           int[] array = new int[1000];
           Random rnd = new Random();
           for (int i=0;i<array.Length;i++)
           {
               array[i]= rnd.Next();
           }
           Array.Sort(array);
           return array;
        }

        // Entry point
        public static void Main(string[] args)
        {
             int[] array = GetRundomArray();
             int target = 984684;
             int targetIndex = BinarySerch(array, target);
             Console.WriteLine(targetIndex==-1?"Target item's index not found":targetIndex.ToString());
        }


