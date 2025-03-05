#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const int RED = 0, BLUE = 1, UNCOLORED = -1;

int n, m;
vector<vector<int>> adj;
vector<int> color; // 记录节点颜色
vector<char> edgeColor; // 存储边的颜色方案
vector<pair<int, int>> edges; // 记录所有边
bool isBipartite = true;

// BFS 进行二分图染色
bool bfs(int start) {
    queue<int> q;
    q.push(start);
    color[start] = RED; // 初始点染成 RED

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (color[v] == UNCOLORED) {
                // 交替染色
                color[v] = 1 - color[u];
                q.push(v);
            } else if (color[v] == color[u]) {
                // 发现矛盾，说明不是二分图
                isBipartite = false;
            }
        }
    }
    return isBipartite;
}

// DFS 检查从 u 到 v 是否存在交替路径（只走已染色的边）
bool hasAlternatingPath(int u, int v, vector<bool>& visited) {
    if (u == v) return true; // 找到路径

    visited[u] = true;
    for (int next : adj[u]) {
        if (!visited[next] && color[next] != color[u]) {
            if (hasAlternatingPath(next, v, visited)) {
                return true;
            }
        }
    }
    return false;
}

int main() {
    cin >> n >> m;
    adj.resize(n + 1);
    color.assign(n + 1, UNCOLORED);
    edgeColor.assign(m, 'G'); // 初始所有边是灰色

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
        edges.push_back({u, v});
    }

    // 尝试二分图染色
    for (int i = 1; i <= n; i++) {
        if (color[i] == UNCOLORED) {
            if (!bfs(i)) {
                isBipartite = false;
            }
        }
    }

    // 处理所有边
    for (int i = 0; i < m; i++) {
        int u = edges[i].first, v = edges[i].second;

        if (color[u] != color[v]) {
            // 若 u, v 颜色不同，则该边不影响二分图性质，可保持灰色
            edgeColor[i] = 'G';
       2 } else {
            // 需要检查是否存在交替路径
            vector<bool> visited(n + 1, false);
            if (hasAlternatingPath(u, v, visited)) {
                edgeColor[i] = 'G'; // 存在交替路径，保持灰色
            } else {
                edgeColor[i] = (color[u] == RED) ? 'B' : 'R'; // 交替失败，必须染色
            }
        }
    }

    // 输出方案
    for (char c : edgeColor) {
        cout << c;
    }
    cout << endl;

    return 0;
}
