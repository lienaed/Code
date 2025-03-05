#include <iostream>
#include <vector>
using namespace std;

int m, n, q, sum;
int max1 = 0, max2=0, loc1=0, loc2=0;

struct change
{
    int type;
    int loc;
    int result;
    change (int a, int b, int c): type(a), loc(b), result(c){};
};
struct due
{
    int front = 0;
    int end = 0;
    int index1 = 0;
    int index2 = 0;
};

vector <int> c, p;
vector <change> qchange;
vector <due> color;

int switchq(int time)
{
    if (time >= 0)
    {
        if (qchange[time].type == 1)
        {
            c[qchange[time].loc] = qchange[time].result;
        }
        else
        {
            p[qchange[time].loc] = qchange[time].result;
        }
    }

    for (int i = 0; i < m; i++)
    {


        if (p[i] > color[c[i]].front)
        {
            color[c[i]].end = color[c[i]].front;
            color[c[i]].index2 = color[c[i]].index1;
            color[c[i]].front = p[i];
            color[c[i]].index1 = i;
        }
        else if (p[i] > color[c[i]].end)
            color[c[i]].end = p[i];
            color[c[i]].index2 = i;
    }
    for (int i = 0; i < n; i++)
    {
        if (color[i].end > max2)
        {
            max2 = color[i].end;
            loc1 = i;
        }
        if (color[i].front > max1)
        {
            max1 = color[i].front;
            loc2 = i;
        }
    }
    if (max1 < max2)
    {
        color[loc2].front = max2;
    }
    for (int i = 0; i < n; i++)
    {
        sum += color[i].front;
    }
    return sum;
}


int main ()
{
    color.resize (n+1);
    for (int i = 0; i < n+1; i++)
    {
        color[i].front = 0;
        color[i].end = 0;
        color[i].index1 = 0;
        color[i].index2 = 0;
    }
    cin >> n >> m >> q;
    int x, y, z;
    for (int i = 0; i < m; i++)
    {
        cin >> x >> y;
        c.push_back (x);
        p.push_back (y);
    }

    for (int i = 0; i < q; i++)
    {
        cin >> x >> y >> z;
        qchange.emplace_back (x, y, z);

    }
    cout << switchq (-1) << endl;
    for (int i = 0; i < q; i++)
    {
        cout << switchq (i) << endl;
    }
    return 0;
}