#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct roads
{
	int end, l, c;
	int act;
	roads(int u, int l, int c, int act) : end(u), l(l), c(c), act(act){};
};

vector <vector <int> > parent;
vector < vector <roads> > map;
vector <vector <int> > length;
vector <bool> enable;
int n, m;
int cost;

void retrieve (int u, int mark)
{
	if (parent[mark].size())
	{
		for (int i = 0; i < map[mark]size(); i++)
		{
			if (map[mark][i].end = parent[mark].end())
			{
				cost += map[mark][i].c;
				break;
			}
		}
		
		retrieve (u, parent[mark].end());

	}
}

void searchpath(int u, int v)
{
	queue <int> q;
	q.push(u);
	length[u].push_back (0);
	int target_length = map[u][v].l;
	vector <bool> visited(n+1, 0);

	while (!q.empty())
	{
		int start = q.front();
		q.pop();

		for (int i = 0; i < map[start].size(); i++)
		{
			if (map[start][i].end == v && start == u)//Initial Path
				continue;

			bool dopush = 0;
			for (int j = 0; j < length[start].size(); j++)
			{
				
				if (map[start][i].l + length[start][j] < target_length)//length test
				{
					length[map[start][i].end].push_back (map[start][i].l + length[start][j]);
					parent[map[start][i].end].push_back (start);
					dopush = 1;

					if (map[start][i].end == v)
						retrieve (u, v);
				}
			}

			if (dopush && !visited[map[start][i].end]) 
			{
    			visited[map[start][i].end] = true;
    			q.push(map[start][i].end);
			}
		}
	}
}


int main()
{
	int p1, p2, len, cost;
	cin >> n >> m;
	map.resize (m+1);
	parent.resize (n+1);
	length.resize (n+1);
	enable.resize (n+1);
	for (int i = 0; i < m; i++)
	{
		cin >> p1 >> p2 >> len >> cost;
		map[p1].emplace_back(p2, len, cost, -1);
		map[p2].emplace_back(p1, len, cost, -1);
	}

	searchpath (1, 2);
	return 0;
}