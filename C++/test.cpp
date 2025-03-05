#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

int main()
{
    int t, n;
    cin >> t >> n;

    vector<string> words(t);
    vector<char> result(t);

    for (int i = 0; i < t; i++)
    {
        cin >> words[i];

        unordered_map<char, vector<int>> positions; // 记录每个字符的索引
        bool wrong = false;

        // 记录字符的索引位置
        for (int j = 0; j < n; j++) {
            positions[words[i][j]].push_back(j);
        }

        // 遍历所有 **出现多次的字符**
        for (auto &p : positions) {
            vector<int> &indices = p.second;
            if (indices.size() > 1) { // 该字符至少出现 2 次
                for (size_t u = 1; u < indices.size(); u++) {
                    if (indices[u] - indices[u - 1] != 2) {
                        wrong = true;
                        break;
                    }
                }
                if (wrong) break;
            }
        }

        result[i] = wrong ? 'F' : 'T';  // ✅ 用 `char` 而不是 `string`
    }

    for (char res : result) {
        cout << res << endl;
    }

    return 0;
}
