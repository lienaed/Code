#include <iostream>
#include <vector>
#include <string>
using namespace std;
vector <long long> num;
vector <char> letter;
vector <long long> countnum;
int main ()
{
    long long x, length = 0, count = 0, numin = 0, recordi, total = 0;
    long long n = 0;
    string code;
    cin >> code;
    for (long long i = 0; i < code.size();)
    {
        recordi = i;
        countnum.assign (0, 0);
        count = 0;
        total = 0;
        letter.push_back (code[i]);

        while (true)
        {
            i++;
            if (code[i] > 95 || i >= code.size())
                break;
            count++;
        }
        if (count)
        {
            for (int j = 0;j < count; j++)
            {
                numin = code[recordi + j + 1] - 48;
                for (long long u = count-1-j; u > 0; u--)
                {
                    numin = numin * 10;
                }
                countnum.push_back (numin);
            }
            for (long long j = 0; j < countnum.size(); j++)
            {
                total += countnum[j];
            }
            num.push_back (total);
        }
        
    }
    cin >> x;

    for (long long i = 0; i < num.size(); i++)
    {
        length += num[i];
    }
    x = x % length;

    for (long long i = 0; i < num.size(); i++)
    {
        if (num[i] >= x)
        {
            cout << letter[i];
            break;
        }
        else
            x -= num[i];
    }
    return 0;
}