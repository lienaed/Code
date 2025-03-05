n = int (input())
a = input().split()
b = input().split()
blocation = []
bnum = []
compair = 0
for i in range (n):
    if b[i] != compair:
        compair = b[i]
        blocation.append (i)
        bnum.append (b[i])
alocation = []
x = 0
for i in range (len(blocation)):
    if a[i] == bnum[x]:
        alocation.append (a[i])
        x += 1

print (alocation)