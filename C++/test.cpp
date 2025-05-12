#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <chrono>

using namespace std;
using namespace chrono;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    for (int i = 0; i < n; ++i) {
        swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped)
            break;
    }
}

int main() {
    const int size = 10000;
    vector<int> arr(size);

    srand(time(0));
    for (int i = 0; i < size; ++i) {
        arr[i] = rand() % 100000;
    }

    auto start = high_resolution_clock::now();
    bubbleSort(arr);
    auto end = high_resolution_clock::now();

    duration<double> elapsed = end - start;
    cout << "排序完成，用时：" << elapsed.count() << " 秒" << endl;

    return 0;
}
