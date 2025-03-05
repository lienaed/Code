#include <iostream>
using namespace std;
int a, b, x, y;
int main ()
{
    cin >> a >> b >> x >> y;
    int u = ((b+y) + max(a, x))*2;
    int v = ((a + x) + max(b, y))*2;
    cout << min(u, v);
    return 0;

}