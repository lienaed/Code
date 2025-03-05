#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main ()
{
    int t, n;
    cin >> t >> n;
    char a[t][n];
    char result[t];
    for (int i = 0; i < t; i++)
    {
        bool wrong = false;
        int data[150];
        fill (data, data+150, -1);
        vector <int> record;
        cin >> a[i];
        for (int j = 0; j < n; j++)
        {
            if (data[(int)a[i][j]] != -1 && data[(int)a[i][j]] != -2)
            {
                record.push_back (j);
                record.push_back (data[(int)a[i][j]]);
                data[(int)a[i][j]] = -2;
            }
            else if (data[(int)a[i][j]] == -2)
            {
                record.push_back (j);
            }
            else
            {
                data[(int)a[i][j]] = j;
            }
        }
        sort (record.begin(), record.end());
        for (int u = 1; u < record.size(); u++)
        {
            if (record[u] - record[u-1] != 2)
                wrong = true;
        }
        if (record.size() == 0)
            wrong = true;
        result[i] = wrong ? 'F' : 'T';
    }
    for (int i = 0; i < t; i++)
    {
        cout << result[i] << endl;
    }
    return 0;
}