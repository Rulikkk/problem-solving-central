public static class MergeSort
{
    /// <summary>
    /// An extension method that providers a convenient way to access mergesort implementation
    /// for all containers that implement IList interface
    /// </summary>
    /// <typeparam name="T">Type of elements in the array</typeparam>
    /// <param name="data">Input array to be sorted</param>
    public static void Sort<T>(this IList<T> data) where T : IComparable
    {
        T[] bufferArray = new T[data.Count];
        Sort(data, bufferArray, 0, data.Count - 1);
    }

    /// <summary>
    /// Mergesort sorts the array by dividing the original array by successivly smaller
    /// subarrays and then merges them back in a sorted order.
    /// </summary>
    /// <typeparam name="T">Type of elements in the array</typeparam>
    /// <param name="data">Input array to be sorted</param>
    /// <param name="buffer">Buffer array in which a sorted sequence will be stored</param>
    /// <param name="bStart">Index of subarray's first element</param>
    /// <param name="bEnd">Index of subarray's last element</param>
    public static void Sort<T>(IList<T> data, T[] buffer, int bStart, int bEnd) where T : IComparable
    {
        if (bStart == bEnd)
            return;

        int bMiddle = bStart + ((bEnd - bStart) / 2);

        Sort(data, buffer, bStart, bMiddle);
        Sort(data, buffer, bMiddle + 1, bEnd);

        int indexL = bStart;
        int indexR = bMiddle + 1;
        int bIndex = indexL;

        while ((indexL <= bMiddle) && (indexR <= bEnd))
        {

            if (data[indexL].CompareTo(data[indexR]) <= 0)
            {
                buffer[bIndex] = data[indexL];
                indexL++;
            }
            else
            {
                buffer[bIndex] = data[indexR];
                indexR++;
            }

            bIndex++;
        }

        for (int i = indexL; i <= bMiddle; i++)
        {
            buffer[bIndex] = data[i];
            bIndex++;
        }

        for (int i = indexR; i <= bEnd; i++)
        {
            buffer[bIndex] = data[i];
            bIndex++;
        }

        for (int i = bStart; i <= bEnd; i++)
            data[i] = buffer[i];
    }
}

