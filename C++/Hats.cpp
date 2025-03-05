#include <iostream>
using namespace std;
int main ()
{
    int n;
    cin >> n;
    int p[n];
    for (int i = 0; i < n; i++)
    {
        cin >> p[i];
    }
    int sum = 0;
    for (int i = 0; i < n/2; i++)
    {
        if (p[i] == p[i+n/2])
            sum += 2;
    }
    cout << sum;
    return 0;
}