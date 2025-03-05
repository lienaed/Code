#include <iostream>
#include <vector>
using namespace std;

int a[300000];
int b[300000];
int sum = 0;

struct location
{
    int x;
    int y;
    char dir;
    location (int a, int b, char z): x(a), y(b), dir(z) {}
    location (int a, int b): x(a), y(b){}
};
vector <int> acheck;
vector <location> bcheck;
vector <location> result;

void output(int b1, int b2, int a1)
{
    if (a1 > b1)
    {
        result.emplace_back (b1, a1, 'R');
        sum++;
    }
    if (a1 < b2)
    {
        result.emplace_back (a1, b2, 'L');
        sum++;
    }
}

void fail()
{
    cout << "NO";
    exit(0);
}

int main ()
{
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> a[i];
    for (int i = 0; i < n; i++)
        cin >> b[i];


    int compair = -1;
    for (int i = 0; i < n; i++)
    {
        if (b[i] != compair)
        {
            compair = b[i];
            bcheck.emplace_back (i, b[i]);
        }
    }
    compair = 0;
    for (int i = 0; i < n; i++)
    {
        if (a[i] == bcheck[compair].y)
        {
            acheck.push_back(i);
            compair++;
            if (compair == bcheck.size()) break;
        }
    }
    if (compair < bcheck.size())  
        fail();


    if (bcheck.size() == 1)
    {
        cout << "YES" << endl;
        cout << 0;
        return 0;
    }

    for (int j = 0; j < acheck.size(); j++)
    {
        for (int i = 0; i < acheck.size(); i++)
        {
            if (i == 0)
            {
                if (bcheck[i+1].x-1 < acheck[i+1])
                {
                    output (bcheck[i].x, bcheck[i+1].x-1, acheck[i]);
                }
            }

            else if (i == acheck.size()-1)
            {
                if (bcheck[i].x > acheck[i-1])
                {
                    output (bcheck[i].x, n, acheck[i]);
                }
            }

            else
            {
                if (bcheck[i+1].x-1 < acheck[i+1] && bcheck[i].x > acheck[i-1])
                {
                    output (bcheck[i].x, bcheck[i+1].x-1, acheck[i]);
                }
            }
        }
    }
    
    cout << "YES" << endl;
    cout << sum << endl;
    for (int i = 0; i < result.size(); i++)
    {
        cout << result[i].dir << result[i].x << result[i].y << endl;
    }
    return 0;
}