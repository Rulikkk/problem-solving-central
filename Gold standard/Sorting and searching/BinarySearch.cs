       /* Problem: Given sorted array and X, please find the position of X in the array
          Solution: Binary Search
          Lang: C#
       */
       public int Go(int[] initarr, int target)
        {
            int min = 0;
            int max = initarr.Length-1;
            int mid = 0;
            if (initarr[min] == target)
            {
                return min;
            }
            if (initarr[max] == target)
            {
                return max;
            }
            while (min<=max)
            {
                mid = min + ((max - min) / 2);
                if (target > initarr[mid])
                {
                    min=mid+1;
                }
                else if (target < initarr[mid])
                {
                    max = mid - 1;
                }
                else
                {
                    return mid;
                }
            }
            return -1;
        }
