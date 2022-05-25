---
title: algorithm
categories:
  - 学习
  - 算法
tags:
  - 算法
img: 'https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/43109579.png'
abbrlink: 9505ccb9
date: 2020-11-16 19:28:42
---

# algorithm

> 过去半年中做的屈指可数的easy题hhh

## 1.二维数组中的查找(数组)

**题目描述**

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```java
public class Solution {
    public boolean Find(int target, int [][] array) {
        int row = array.length - 1, column = 0;
        while(row >= 0 && column < array[0].length) {
            if(array[row][column] > target) {
                row--;
            } else if(array[row][column] < target) {
                column++;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

## 2.字符串替换空格(StringBuilder)

**题目描述**

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

```java
public class Solution {
    public String replaceSpace(StringBuffer str) {
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if(c == ' ') {
                sb.append("%20");
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}
```

## 3.从尾到头打印链表(栈)

**题目描述**

输入一个链表，按链表从尾到头的顺序返回一个ArrayList。

### (1)栈实现

```java
import java.util.*;
public class Solution {
    public ArrayList<Integer> printListFromTailToHead(ListNode listNode) {
        ArrayList<Integer> arr = new ArrayList<>();
        Stack<Integer> s = new Stack<>();
        while(listNode != null) {
            s.push(listNode.val);
            listNode = listNode.next;
        }
        while(!s.isEmpty()) {
            arr.add(s.pop());
        }
        return arr;
    }
}
```

### (2)递归实现

```java
import java.util.*;
public class Solution {
    public ArrayList<Integer> printListFromTailToHead(ListNode listNode) {
        ArrayList<Integer> arr = new ArrayList<>();
        recurcive(arr, listNode);
        return arr;
    }
    
    private void recurcive(ArrayList arr, ListNode listNode) {
        if(listNode != null) {
            recurcive(arr, listNode.next);
            arr.add(listNode.val);
        }
    }
}
```

## 4.重建二叉树(递归)

**题目描述**

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

```java
import java.util.*;
public class Solution {
    public TreeNode reConstructBinaryTree(int [] pre,int [] in) {
        if(pre.length == 0 || in.length == 0) return null;
        TreeNode root = new TreeNode(pre[0]);
        for(int i = 0; i < in.length; i++) {
            if(in[i] == pre[0]) {
                root.left = reConstructBinaryTree(Arrays.copyOfRange(pre,1,1 + i), Arrays.copyOf(in, i));
                root.right = reConstructBinaryTree(Arrays.copyOfRange(pre,1 + i,pre.length), Arrays.copyOfRange(in,i + 1,in.length));
            }
        }
        return root;
    }
}
```

## 5.两数之和(HashMap)

**题目描述**

给出一个整数数组，请在数组中找出两个加起来等于目标值的数，你给出的函数twoSum 需要返回这两个数字的下标（index1，index2），需要满足 index1 小于index2.。注意：下标是从1开始的，假设给出的数组中只存在唯一解

```java
import java.util.*;
import java.lang.*;
public class Solution {
    /**
     * @param numbers int整型一维数组 
     * @param target int整型 
     * @return int整型一维数组
     */
public int[] twoSum (int[] numbers, int target) {
    int[] result = new int[2];
    HashMap<Integer,Integer> hm = new HashMap<>();
    for(int i = 0; i < numbers.length; i++) {
        if(hm.containsKey(target - numbers[i])) {
            result[0] = hm.get(target - numbers[i]);
            result[1] = i + 1;
            return result;
        } else {
           hm.put(numbers[i],i + 1);
          }
     }
     return null;
    }
}
```

## 6.最长不重复子串(动态窗口法)

**题目描述**

给定一个字符串，找出最长的不具有重复字符的子串的长度。例如，“abcabcbb”不具有重复字符的最长子串是“abc”，长度为3。对于“bbbbb”，最长的不具有重复字符的子串是“b”，长度为1。

```java
import java.util.*;
public class Solution {
    /**
     * @param s string字符串 
     * @return int整型
     */
    public int lengthOfLongestSubstring (String s) {
        if(s == null) return 0;
        int max = 0, lastChar = 0;
        HashMap<Character,Integer> hm = new HashMap<>();
        for(int i = 0; i < s.length(); i++) {
            char next = s.charAt(i);
            if(hm.containsKey(next)) {
                lastChar = Math.max(lastChar, hm.get(next) + 1);
            }
            hm.put(next, i);
            max = Math.max(max, i - lastChar + 1);
        }
        return max;
    }
}
```

## 7.用栈实现队列(栈&队列)

**题目描述**

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

```java
import java.util.Stack;
public class Solution {
    Stack<Integer> stack1 = new Stack<Integer>();
    Stack<Integer> stack2 = new Stack<Integer>();
    
    public void push(int node) {
        stack1.push(node);
    }
    
    public int pop() {
        if(stack2.isEmpty()) {
            while(!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.pop();
    }
}
```

## 8.斐波那契数列(循环优于递归)

**题目描述**

大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0，第1项是1）。n<=39

```java
public class Solution {
    public int Fibonacci(int n) {
        if(n < 0) throw new IllegalArgumentException("illegal index:" + n);
        if(n < 2) {
            return n;
        }
        
        int small = 0, big = 1, result = 0;
        for(int i = 2;i <= n;i++) {
            result = small + big;
            small = big;
            big = result;
        }
        
        return result;
    }
}
```

## 9.跳台阶(递归)

**题目描述**

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

```java
public class Solution {
    public int JumpFloor(int target) {
        if(target < 0) return 0;
        if(target < 3) return target;
        return JumpFloor(target - 1) + JumpFloor(target - 2);
    }
}
```

## 10.变态跳台阶(贪心)

**题目描述**

一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

**【分析】**  

> 每个台阶可以看作一块木板，让青蛙跳上去(最初🐸没踩在板上)，n个台阶就有n块木板，最后一块木板是青蛙到达的位子，  必须存在，其他 (n-1) 块木板可以任意选择是否存在，则每个木板有存在和不存在两种选择，(n-1) 块木板  就有 [2^(n-1)] 种跳法，可以直接得到结果。所以除了第一位外，其他位的数都是前一位的数去乘以2所得到的积。

```java
public class Solution {
    public int JumpFloorII(int target) {
        if(target < 1) return 0;
        return 1 << --target;
    }
}
```

## 11.矩形覆盖(递归)

**题目描述**

我们可以用21的小矩形横着或者竖着去覆盖更大的矩形。请问用n个21的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

```java
public class Solution {
    public int RectCover(int target) {
        if(target < 1) return 0;
        if(target < 3) return target;
        return RectCover(target - 1) + RectCover(target - 2);
    }
}
```



## 12.二叉树的镜像/反转二叉树(递归&树)

**题目描述**

操作给定的二叉树，将其变换为源二叉树的镜像。

```java
public class Solution {
    public void Mirror(TreeNode root) {
        reverse(root);
    }
    
    private TreeNode reverse(TreeNode root) {
        if(root == null) return root;
        TreeNode temp = root.left;
        root.left = reverse(root.right);
        root.right = reverse(temp);
        return root;
    }
}
```

## 13.二进制中1的个数(位运算)

**题目描述**

输入一个整数，输出该数32位二进制表示中1的个数。其中负数用补码表示。

```java
public class Solution {
    public int NumberOf1(int n) {
        int count = 0;
        while(n != 0) {
            n &= n - 1;
            count++;
        }
        return count;
    }
}
```

## 14.数值的整数次方(递归&位运算&快速幂)

**题目描述**

给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

保证base和exponent不同时为0。

```java
import java.math.*;
public class Solution {
    public double Power(double base, int exponent) {
        int absExp = Math.abs(exponent);
        if(absExp == 0) return 1;
        if(absExp == 1) return base;
        double result = Power(base, absExp >> 1);
        result *= result;
        if((absExp & 1) == 1) {
            result *= base;
        }
        if(exponent < 0) {
            return 1 / result;
        }
        return result;
  }
}
```

## 15.调整数组顺序使奇数位于偶数前面(LinkedHashSet)

**题目描述**

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

> 利用LinkedHashSet

```java
import java.util.*;
public class Solution {
    public void reOrderArray(int [] array) {
        LinkedHashSet<Integer> set1 = new LinkedHashSet<>();
        LinkedHashSet<Integer> set2 = new LinkedHashSet<>();
        for(int i = 0; i < array.length; i++) {
            if((array[i] & 1) == 1) {
                set1.add(array[i]);
            } else {
                set2.add(array[i]);
            }
        }
        
        int index = 0;
        for(int num : set1) {
            array[index] = num;
            index++;
        }
         for(int num : set2) {
            array[index] = num;
            index++;
        }
    }
}
```

## 16.求链表倒数第k个节点(快慢指针&链表)

**题目描述**

输入一个链表，输出该链表中倒数第k个结点。

> 要注意：
>
> 链表为null或k <= 0的情况(最少为倒数第一个所以不能是0)

```java
public class Solution {
    public ListNode FindKthToTail(ListNode head,int k) {
        if(head == null || k <= 0) return null;
        ListNode fast = head;
        ListNode slow = head;
        for(int i = 0; i < k - 1; i++) {
            if(fast.next == null) {
                return null;
            }
            fast = fast.next;
        }
        while(fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        return slow;
    }
}
```

## 17.合并两个排序的链表(递归)

**题目描述**

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

```java
public class Solution {
    public ListNode Merge(ListNode list1,ListNode list2) {
        if(list1 == null) return list2;
        if(list2 == null) return list1;
        ListNode result = null;
        if(list1.val > list2.val) {
            result = list2;
            result.next = Merge(list1, list2.next);
        } else {
            result = list1;
            result.next = Merge(list1.next, list2);
        }
        return result;
    }
}
```

## 18.反转链表(链表&递归)

**题目描述**

输入一个链表，反转链表后，输出新链表的表头。

### (1)指针法

```java
public class Solution {
    public ListNode ReverseList(ListNode head) {
        ListNode pre = null;
        ListNode next = null;
        while(head != null) {
            next = head.next;
            head.next = pre;
            pre = head;
            head = next;
        }
        return pre;
    }
}
```

### (3)递归法

```java
public class Solution {
    public ListNode ReverseList(ListNode head) {
        if(head == null || head.next == null) return head;
        ListNode reversed = ReverseList(head.next);
        head.next.next = head;
        head.next = null;
        return reversed;
    }
}
```

## 19.树的子结构(递归&树)

**题目描述**

输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

```java
public class Solution {
    public boolean HasSubtree(TreeNode root1,TreeNode root2) {
    if(root1 == null || root2 == null)  return false;
    return doesTree1HasTree2(root1, root2)|| HasSubtree(root1.left, root2) || HasSubtree(root1.right, root2);
    }
 
    private boolean doesTree1HasTree2(TreeNode root1,TreeNode root2) {
        if(root2 == null)  return true;
        if(root1 == null)  return false;
        return root1.val == root2.val && doesTree1HasTree2(root1.left, root2.left) && doesTree1HasTree2(root1.right, root2.right);
    }
}
```

## 20.层序遍历二叉树(树)

### (1)整棵树遍历

**题目描述**

从上往下打印出二叉树的每个节点，同层节点从左至右打印。

```java
public class Solution {
    public ArrayList<Integer> PrintFromTopToBottom(TreeNode root) {
        if(root == null) return new ArrayList<Integer>();
        ArrayList<Integer> arr = new ArrayList<>(10);
        Queue<TreeNode> s = new LinkedList<>();
        s.add(root);
        while(!s.isEmpty()) {
            TreeNode node = s.remove();
            arr.add(node.val);
            if(node.left != null) s.add(node.left);
            if(node.right != null) s.add(node.right);
        }
        return arr;
    }
}
```



### (2)按层遍历

**题目描述**

给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）

```java
public ArrayList<ArrayList<Integer>> levelOrder(TreeNode root) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        if (root != null) {
            Queue<TreeNode> levelQueue = new LinkedList<>();
            levelQueue.offer(root);
            while (!levelQueue.isEmpty()) {
                ArrayList<Integer> levelList = new ArrayList<>();
                int levelCount = levelQueue.size();
                for (int i = 0; i < levelCount; i++) {
                    TreeNode tmp = levelQueue.poll();
                    levelList.add(tmp.val);
                    if (tmp.left != null) {
                        levelQueue.offer(tmp.left);
                    }
                    if (tmp.right != null) {
                        levelQueue.offer(tmp.right);
                    }
                }
                result.add(levelList);
            }
        }
        return result;
}
```

## 20.快速排序(递归)

**题目描述**

写个快排看看

```java
	void QuickSortMethod(int A[], int low, int high) {
        if (low < high) {
            int pivot = partition(A, low, high);
            QuickSortMethod(A, low, pivot - 1);
            QuickSortMethod(A, pivot + 1, high);
        }
    }

	int partition(int A[], int low, int high) {
        int pivot = A[low];
        while (low < high) {
            while (low < high && A[high] >= pivot) high--;
            A[low] = A[high];
            while (low < high && A[low] <= pivot) low++;
            A[high] = A[low];
        }
        A[low] = pivot;
        return low;
    }
```

## 21.包含min()函数的栈(栈)

**题目描述**

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。

```java
public class Solution {

    Stack<Integer> main = new Stack<>();
    Stack<Integer> min = new Stack<>();
    public void push(int node) {
        if(min.isEmpty() || node < min.peek()) {
            min.push(node);
        }
        main.push(node);
    }
    
    public void pop() {
        int mainPop = main.pop();
        if(mainPop == min.peek()) {
            min.pop();
        }
    }
    
    public int top() {
        return main.peek();
    }
    
    public int min() {
        return min.peek();
    }
}
```

## 22.栈的压入、弹出序列(栈)

**题目描述**

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

```java
import java.util.*;
public class Solution {
    public boolean IsPopOrder(int [] pushA,int [] popA) {
        if(pushA.length == 0 || popA.length == 0 || pushA.length != popA.length) {
            return false;
        }
        Stack<Integer> stack = new Stack<>();
        for(int i = 0, j = 0; i < pushA.length; i++) {
            stack.push(pushA[i]);
            while(!stack.isEmpty() && stack.peek() == popA[j]) {
                stack.pop();
                j++;
            }
        }
        return stack.isEmpty();
    }
}
```

## 23.二叉树的后序遍历(递归)

**题目描述**

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

```java
import java.util.*;
public class Solution {
    public boolean VerifySquenceOfBST(int [] sequence) {
        if(sequence == null || sequence.length == 0) {
            return false;
        }
        int rightFirst = 0;
        while(rightFirst < sequence.length - 1) {
            if(sequence[rightFirst] > sequence[sequence.length - 1]) {
                break;
            }
            rightFirst++;
        }
        int right = rightFirst;
        while(right < sequence.length - 1) {
            if(sequence[right] < sequence[sequence.length - 1]) {
                return false;
            }
            right++;
        }
        boolean judgeLeft = true;
        boolean judgeRight = true;
        if(rightFirst > 0) {
            judgeLeft = VerifySquenceOfBST(Arrays.copyOf(sequence, rightFirst));
        }
        if(rightFirst < sequence.length - 1) {
            judgeRight = VerifySquenceOfBST(Arrays.copyOfRange(sequence, rightFirst, sequence.length - 1));
        }
        return judgeLeft && judgeRight;
            
    }
}
```

## 24.最小的k个数(数组)

**题目描述**

输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。

### (1)TreeSet法

```java
import java.util.*;
public class Solution {
    public ArrayList<Integer> GetLeastNumbers_Solution(int [] input, int k) {
        ArrayList<Integer> arr = new ArrayList<>(10);
        if(k > input.length) return arr;
        TreeSet<Integer> set = new TreeSet<>();
        for(int n : input) {
            set.add(n);
        }
        Iterator<Integer> it = set.iterator();
        int count = 0;
        while(count < k) {
            arr.add(it.next());
            count++;
        }
        return arr;
    }
}
```

### (2)排序法

```java
public class Solution {
    public ArrayList<Integer> GetLeastNumbers_Solution(int[] input, int k) {
        ArrayList<Integer> res = new ArrayList<>();
        if (input == null || k <= 0 || k > input.length) {
            return res;
        }
        Arrays.sort(input);
        for (int i = 0; i < k; i++) {
            res.add(input[i]);
        }
        return res;
    }
}
```

### (3)最大堆法

```java
public class Solution {
    public ArrayList<Integer> GetLeastNumbers_Solution(int[] input, int k) {
        ArrayList<Integer> res = new ArrayList<>();
        if (input == null || k <= 0 || k > input.length) {
            return res;
        }
        Queue<Integer> queue = new PriorityQueue<>(k, Collections.reverseOrder());

        for (int i = 0; i < input.length; i++) {

            if (queue.size() < k) {
                queue.add(input[i]);
            } else {
                if (input[i] < queue.peek()) {
                    queue.remove();
                    queue.add(input[i]);
                }
            }
        }
        while (!queue.isEmpty()) {
            res.add(queue.remove());
        }
        return res;
    }
}
```

## 25.连续子数组的最大和

**题目描述**

HZ偶尔会拿些专业问题来忽悠那些非计算机专业的同学。今天测试组开完会后,他又发话了:在古老的一维模式识别中,常常需要计算连续子向量的最大和,当向量全为正数的时候,问题很好解决。但是,如果向量中包含负数,是否应该包含某个负数,并期望旁边的正数会弥补它呢？例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。给一个数组，返回它的最大连续子序列的和，你会不会被他忽悠住？(子向量的长度至少是1)

```java
public class Solution {
    public int FindGreatestSumOfSubArray(int[] array) {
        if(array == null || array.length == 0) return 0;
        int right = 0, max = Integer.MIN_VALUE, tmp = 0;
        while(right < array.length) {
            tmp += array[right];
            max = tmp > max ? tmp : max;
            if(tmp < 0 ) tmp = 0;
            right++;
        }
        return max;
    }
}
```

## 26.数组中出现次数超过一半的数字(相消思想)

**题目描述**

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

```java
public class Solution {
    public int MoreThanHalfNum_Solution(int [] array) {
        if(array == null || array.length == 0) return 0;
        
        int result = array[0];
        int count = 1;
        for(int i = 1; i < array.length; i++) {
            if(count == 0) {
                result = array[i];
                count = 1;
            }
            if(array[i] == result) count++;
            else count--;
        }
        
        //检查是否超过一半
        int times = 0;
        for(int n : array) {
            if (result == n) times++;
        }
        if (times * 2 <= array.length) return 0;
        
        return result;
    }
}
```

## 27.第一个只出现一次的字符(HashMap)

**题目描述**

在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.（从0开始计数）

```java
import java.util.*;
public class Solution {
    public int FirstNotRepeatingChar(String str) {
        if (str == null || str.length() == 0) return -1;
        HashMap<Character,Integer> map = new HashMap<>();
        for(int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if(map.containsKey(c)) {
                map.put(c, map.get(c) + 1);
            } else {
                map.put(c, 1);
            }
        }
        for( int j = 0; j < str.length(); j++) {
            char ch = str.charAt(j);
            if (map.get(ch) == 1) {
                return j;
            }
        }
        return -1;
    }
}
```

## 28.两个链表的第一个公共节点(快慢指针)

**题目描述**

输入两个链表，找出它们的第一个公共结点。（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）

```java
public class Solution {
    public ListNode FindFirstCommonNode(ListNode pHead1, ListNode pHead2) {
        if (pHead1 == null || pHead2 == null) {
            return null;
        }
        //遍历短链表
        ListNode p1 = pHead1, p2 = pHead2;
        while(p1 != null && p2 != null) {
            p1 = p1.next;
            p2 = p2.next;
        }
        //让longer和shorter的后面节点数相等
        ListNode longer = null, shorter = null;
        if (p1 != null) {
            longer = pHead1;
            shorter = pHead2;
            while(p1 != null) {
                p1 = p1.next;
                longer = longer.next;
            }
        } else {
            longer = pHead2;
            shorter = pHead1;
            while(p2 != null) {
                p2 = p2.next;
                longer = longer.next;
            }
        }
        //找公共节点
        while(longer != shorter) {
            longer = longer.next;
            shorter = shorter.next;
        }
        return longer;
    }
}
```

## 29.二叉树的前序遍历(栈)

**题目描述**

求给定的二叉树的前序遍历。

例如：

给定的二叉树为{1,#,2,3},

![img](https://uploadfiles.nowcoder.com/images/20200806/999991351_1596689741201_2A820354FCD6B266C9A4FBAF6B9CFC97)

返回：[1,2,3].

备注；用递归来解这道题很简单，你可以给出迭代的解法么？

如果你不明白{1,#,2,3}的含义，[点击查看相关信息](https://www.nowcoder.com/questionTerminal/04a5560e43e24e9db4595865dc9c63a3)

### (1)非递归

```java
public ArrayList<Integer> preorderTraversal (TreeNode root) {
        ArrayList<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Stack<TreeNode> s = new Stack<>();
        s.push(root);
        while(!s.isEmpty()) {
            TreeNode node = s.pop();
            result.add(node.val);
            if (node.right != null) {
                s.push(node.right);
            }
            if (node.left != null) {
                s.push(node.left);
            }
        }
        return result;
    }
```

### (2)递归

```java
public class Solution {
    private static ArrayList<Integer> arr = new ArrayList<>();

    public ArrayList<Integer> preorderTraversal (TreeNode root) {
        if (root == null) return arr;
        preOrder(root);
        return arr;
    }
    
    private void preOrder(TreeNode root) {
        if (root == null) return;
        arr.add(root.val);
        preOrder(root.left);
        preOrder(root.right);
    }
}
```

## 30.设计LRU缓存结构

**题目描述**

该结构在构造时确定大小，假设大小为K，并有如下两个功能

- set(key, value)：将记录(key, value)插入该结构
- get(key)：返回key对应的value值

[要求]

1. set和get方法的时间复杂度为O(1)
2. 某个key的set或get操作一旦发生，认为这个key的记录成了最常使用的。
3. 当缓存的大小超过K时，移除最不经常使用的记录，即set或get最久远的。

若opt=1，接下来两个整数x, y，表示set(x, y)
若opt=2，接下来一个整数x，表示get(x)，若x未出现过或已被移除，则返回-1
对于每个操作2，输出一个答案

```java

```

## 31.二分查找(二分)

**题目描述**

请实现有重复数字的有序数组的二分查找。

输出在数组中第一个大于等于查找值的位置，如果数组中不存在这样的数，则输出数组长度加一。

```java
public int upper_bound_ (int n, int v, int[] a) {
        int small = 0, big = n - 1;
        for(int i = (small + big) >> 1; small < big; i = (small + big) >> 1) {
            if (a[i] >= v) {
                if (i == 0 || a[i - 1] < v) {
                    return i + 1;
                } else {
                    big = i;
                }
            } else {
                small = i + 1;
            }
        }
        return n + 1;
    }
```

## 32.约瑟夫环(环形数组/链表)

**题目描述**

让小朋友们围成一个大圈。然后,他随机指定一个数m,让编号为0的小朋友开始报数。每次喊到m-1的那个小朋友要出列唱首歌,然后可以在礼品箱中任意的挑选礼物,并且不再回到圈中,从他的下一个小朋友开始,继续0...m-1报数....这样下去....直到剩下最后一个小朋友,可以不用表演,并且拿到牛客名贵的“名侦探柯南”典藏版(名额有限哦!!^_^)。请你试着想下,哪个小朋友会得到这份礼品呢？(注：小朋友的编号是从0到n-1)

```java
public static int findLastNumber(int n,int m){
        if(n<1||m<1) return -1;
        int[] array = new int[n];
        int i = -1,step = 0, count = n;
        while(count>0){   //跳出循环时将最后一个元素也设置为了-1
            i++;          //指向上一个被删除对象的下一个元素。
            if(i>=n) i=0;  //模拟环。
            if(array[i] == -1) continue; //跳过被删除的对象。
            step++;                     //记录已走过的。
            if(step==m) {               //找到待删除的对象。
                array[i]=-1;
                step = 0;
                count--;
            }        
        }
        return i;//返回跳出循环时的i,即最后一个被设置为-1的元素
    }

```

