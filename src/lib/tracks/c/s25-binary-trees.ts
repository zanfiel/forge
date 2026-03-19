import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-tree',
  title: '25. Binary Trees',
  explanation: `## Binary Trees

A binary tree is a hierarchical data structure where each node has at most two children (left and right).

\`\`\`c
typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

// Create a node
TreeNode *new_node(int data) {
    TreeNode *n = malloc(sizeof(TreeNode));
    n->data = data;
    n->left = n->right = NULL;
    return n;
}
\`\`\`

### Key Concepts
- **BST** (Binary Search Tree): left < node < right
- **Traversals**: inorder (LNR), preorder (NLR), postorder (LRN)
- **Height**: longest path from root to leaf
- **Balanced**: height difference between subtrees <= 1
`,
  exercises: [
    {
      id: 'c-tree-1',
      title: 'Define tree node',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Define a binary tree node structure.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int data;
    struct TreeNode *__BLANK__;
    struct TreeNode *__BLANK__;
} TreeNode;

TreeNode *new_node(int data) {
    TreeNode *n = (TreeNode *)__BLANK__(sizeof(TreeNode));
    n->data = data;
    n->left = n->right = NULL;
    return n;
}

int main(void) {
    TreeNode *root = new_node(10);
    root->left = new_node(5);
    root->right = new_node(15);
    printf("%d %d %d\\n", root->data, root->left->data, root->right->data);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode *new_node(int data) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = data;
    n->left = n->right = NULL;
    return n;
}

int main(void) {
    TreeNode *root = new_node(10);
    root->left = new_node(5);
    root->right = new_node(15);
    printf("%d %d %d\\n", root->data, root->left->data, root->right->data);
    return 0;
}`,
      hints: [
        'Each node has a left and right child pointer.',
        'Use malloc to allocate memory for new nodes.',
        'Initialize children to NULL for leaf nodes.',
      ],
      concepts: ['tree node', 'struct definition', 'malloc'],
    },
    {
      id: 'c-tree-2',
      title: 'BST insert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Insert a value into a binary search tree.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

TreeNode *bst_insert(TreeNode *root, int val) {
    if (!root) return new_node(val);
    if (val < root->data)
        root->__BLANK__ = bst_insert(root->__BLANK__, val);
    else if (val > root->data)
        root->__BLANK__ = bst_insert(root->__BLANK__, val);
    return root;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

TreeNode *bst_insert(TreeNode *root, int val) {
    if (!root) return new_node(val);
    if (val < root->data)
        root->left = bst_insert(root->left, val);
    else if (val > root->data)
        root->right = bst_insert(root->right, val);
    return root;
}`,
      hints: [
        'If val < root->data, go left.',
        'If val > root->data, go right.',
        'Base case: if root is NULL, create and return a new node.',
      ],
      concepts: ['BST insert', 'recursion', 'binary search property'],
    },
    {
      id: 'c-tree-3',
      title: 'Predict inorder traversal',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the inorder traversal output of a BST.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;
TreeNode *nn(int d) { TreeNode *n = malloc(sizeof(TreeNode)); n->data=d; n->left=n->right=NULL; return n; }
TreeNode *ins(TreeNode *r, int v) { if(!r) return nn(v); if(v<r->data) r->left=ins(r->left,v); else if(v>r->data) r->right=ins(r->right,v); return r; }
void inorder(TreeNode *r) { if(!r) return; inorder(r->left); printf("%d ", r->data); inorder(r->right); }

int main(void) {
    TreeNode *root = NULL;
    int vals[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) root = ins(root, vals[i]);
    inorder(root);
    printf("\\n");
    return 0;
}`,
      solution: `20 30 40 50 60 70 80 `,
      hints: [
        'Inorder visits: left subtree, node, right subtree.',
        'For a BST, inorder gives sorted order.',
        'Tree: 50 is root, left subtree has 20,30,40, right has 60,70,80.',
      ],
      concepts: ['inorder traversal', 'BST sorted order', 'recursion'],
    },
    {
      id: 'c-tree-4',
      title: 'Write preorder traversal',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write preorder and postorder traversal functions.',
      skeleton: `// Given: typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;
// Write void preorder(TreeNode *root) - prints: node, left, right
// Write void postorder(TreeNode *root) - prints: left, right, node`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

void preorder(TreeNode *root) {
    if (!root) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void postorder(TreeNode *root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}

int main(void) {
    TreeNode *root = new_node(1);
    root->left = new_node(2);
    root->right = new_node(3);
    root->left->left = new_node(4);
    root->left->right = new_node(5);

    printf("Preorder: ");
    preorder(root);
    printf("\\nPostorder: ");
    postorder(root);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Preorder: print node, recurse left, recurse right (NLR).',
        'Postorder: recurse left, recurse right, print node (LRN).',
        'Base case: if root is NULL, return.',
      ],
      concepts: ['preorder', 'postorder', 'tree traversal'],
    },
    {
      id: 'c-tree-5',
      title: 'BST search',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Search for a value in a BST.',
      skeleton: `TreeNode *bst_search(TreeNode *root, int val) {
    if (!root || root->data == val)
        return __BLANK__;
    if (val < root->data)
        return bst_search(root->__BLANK__, val);
    return bst_search(root->__BLANK__, val);
}`,
      solution: `TreeNode *bst_search(TreeNode *root, int val) {
    if (!root || root->data == val)
        return root;
    if (val < root->data)
        return bst_search(root->left, val);
    return bst_search(root->right, val);
}`,
      hints: [
        'If root is NULL or data matches, return root.',
        'If val < data, search the left subtree.',
        'If val > data, search the right subtree.',
      ],
      concepts: ['BST search', 'binary search', 'O(log n)'],
    },
    {
      id: 'c-tree-6',
      title: 'Find min and max in BST',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Find the minimum and maximum values in a BST.',
      skeleton: `// Write TreeNode *bst_min(TreeNode *root) - returns node with minimum value.
// Write TreeNode *bst_max(TreeNode *root) - returns node with maximum value.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

TreeNode *bst_min(TreeNode *root) {
    if (!root) return NULL;
    while (root->left) root = root->left;
    return root;
}

TreeNode *bst_max(TreeNode *root) {
    if (!root) return NULL;
    while (root->right) root = root->right;
    return root;
}

TreeNode *bst_insert(TreeNode *r, int v) {
    if (!r) return new_node(v);
    if (v < r->data) r->left = bst_insert(r->left, v);
    else if (v > r->data) r->right = bst_insert(r->right, v);
    return r;
}

int main(void) {
    TreeNode *root = NULL;
    int vals[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) root = bst_insert(root, vals[i]);

    printf("Min: %d\\n", bst_min(root)->data);
    printf("Max: %d\\n", bst_max(root)->data);
    return 0;
}`,
      hints: [
        'In a BST, the minimum is the leftmost node.',
        'The maximum is the rightmost node.',
        'Follow left/right pointers until NULL.',
      ],
      concepts: ['BST min', 'BST max', 'leftmost/rightmost'],
    },
    {
      id: 'c-tree-7',
      title: 'Predict preorder output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the preorder traversal of a specific tree.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;
TreeNode *nn(int d) { TreeNode *n = malloc(sizeof(TreeNode)); n->data=d; n->left=n->right=NULL; return n; }

void preorder(TreeNode *r) { if(!r) return; printf("%d ", r->data); preorder(r->left); preorder(r->right); }

int main(void) {
    TreeNode *root = nn(1);
    root->left = nn(2);
    root->right = nn(3);
    root->left->left = nn(4);
    root->left->right = nn(5);
    root->right->right = nn(6);
    preorder(root);
    printf("\\n");
    return 0;
}`,
      solution: `1 2 4 5 3 6 `,
      hints: [
        'Preorder: visit node, then left subtree, then right subtree.',
        'Root 1, then left subtree: 2 -> 4 -> 5.',
        'Then right subtree: 3 -> 6.',
      ],
      concepts: ['preorder traversal', 'NLR order', 'predict output'],
    },
    {
      id: 'c-tree-8',
      title: 'Tree height',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function to compute the height of a binary tree.',
      skeleton: `// Write int tree_height(TreeNode *root)
// Height of empty tree is -1, single node is 0.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

int tree_height(TreeNode *root) {
    if (!root) return -1;
    int lh = tree_height(root->left);
    int rh = tree_height(root->right);
    return 1 + (lh > rh ? lh : rh);
}

int main(void) {
    TreeNode *root = new_node(1);
    root->left = new_node(2);
    root->right = new_node(3);
    root->left->left = new_node(4);
    root->left->left->left = new_node(5);

    printf("Height: %d\\n", tree_height(root));
    return 0;
}`,
      hints: [
        'Height = 1 + max(left_height, right_height).',
        'Base case: NULL node has height -1.',
        'A single node (no children) has height 0.',
      ],
      concepts: ['tree height', 'recursion', 'max depth'],
    },
    {
      id: 'c-tree-9',
      title: 'Count nodes',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Count the total number of nodes in a binary tree.',
      skeleton: `int count_nodes(TreeNode *root) {
    if (__BLANK__) return 0;
    return 1 + count_nodes(root->__BLANK__) + count_nodes(root->__BLANK__);
}`,
      solution: `int count_nodes(TreeNode *root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}`,
      hints: [
        'Base case: NULL node contributes 0.',
        'Each non-NULL node contributes 1 plus its subtrees.',
        'Total = 1 + count(left) + count(right).',
      ],
      concepts: ['count nodes', 'recursion', 'tree size'],
    },
    {
      id: 'c-tree-10',
      title: 'Fix BST delete bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix a BST delete function that does not handle the two-children case correctly.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;
TreeNode *nn(int d) { TreeNode *n = malloc(sizeof(TreeNode)); n->data=d; n->left=n->right=NULL; return n; }

TreeNode *bst_min(TreeNode *r) { while(r->left) r=r->left; return r; }

// Bug: two-children case doesn't properly reconnect
TreeNode *bst_delete(TreeNode *root, int val) {
    if (!root) return NULL;
    if (val < root->data) { root->left = bst_delete(root->left, val); }
    else if (val > root->data) { root->right = bst_delete(root->right, val); }
    else {
        if (!root->left) { TreeNode *r = root->right; free(root); return r; }
        if (!root->right) { TreeNode *l = root->left; free(root); return l; }
        // Bug: copies data but doesn't delete the successor
        TreeNode *succ = bst_min(root->right);
        root->data = succ->data;
    }
    return root;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;
TreeNode *nn(int d) { TreeNode *n = malloc(sizeof(TreeNode)); n->data=d; n->left=n->right=NULL; return n; }

TreeNode *bst_min(TreeNode *r) { while(r->left) r=r->left; return r; }

TreeNode *bst_delete(TreeNode *root, int val) {
    if (!root) return NULL;
    if (val < root->data) { root->left = bst_delete(root->left, val); }
    else if (val > root->data) { root->right = bst_delete(root->right, val); }
    else {
        if (!root->left) { TreeNode *r = root->right; free(root); return r; }
        if (!root->right) { TreeNode *l = root->left; free(root); return l; }
        TreeNode *succ = bst_min(root->right);
        root->data = succ->data;
        root->right = bst_delete(root->right, succ->data);
    }
    return root;
}`,
      hints: [
        'After copying the successor\'s data, you must delete the successor node.',
        'The successor is the minimum of the right subtree.',
        'Recursively delete the successor from the right subtree.',
      ],
      concepts: ['BST delete', 'inorder successor', 'two-children case'],
    },
    {
      id: 'c-tree-11',
      title: 'Level-order traversal (BFS)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a level-order (breadth-first) traversal using a queue.',
      skeleton: `// Write void level_order(TreeNode *root) that prints nodes level by level.
// Use an array-based queue of TreeNode pointers.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

void level_order(TreeNode *root) {
    if (!root) return;
    TreeNode *queue[256];
    int front = 0, rear = 0;
    queue[rear++] = root;

    while (front < rear) {
        TreeNode *cur = queue[front++];
        printf("%d ", cur->data);
        if (cur->left) queue[rear++] = cur->left;
        if (cur->right) queue[rear++] = cur->right;
    }
    printf("\\n");
}

int main(void) {
    TreeNode *root = new_node(1);
    root->left = new_node(2);
    root->right = new_node(3);
    root->left->left = new_node(4);
    root->left->right = new_node(5);
    root->right->right = new_node(6);

    level_order(root);
    return 0;
}`,
      hints: [
        'Use a queue of TreeNode pointers.',
        'Enqueue root, then dequeue and enqueue children.',
        'Continue until the queue is empty.',
      ],
      concepts: ['level-order', 'BFS', 'queue-based traversal'],
    },
    {
      id: 'c-tree-12',
      title: 'Predict postorder output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the postorder traversal of a specific tree.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;
TreeNode *nn(int d) { TreeNode *n = malloc(sizeof(TreeNode)); n->data=d; n->left=n->right=NULL; return n; }
void postorder(TreeNode *r) { if(!r) return; postorder(r->left); postorder(r->right); printf("%d ", r->data); }

int main(void) {
    TreeNode *r = nn(10);
    r->left = nn(5);
    r->right = nn(15);
    r->left->left = nn(3);
    r->left->right = nn(7);
    r->right->left = nn(12);
    postorder(r);
    printf("\\n");
    return 0;
}`,
      solution: `3 7 5 12 15 10 `,
      hints: [
        'Postorder: left subtree, right subtree, then node.',
        'Left subtree of 10: post(5) = 3 7 5.',
        'Right subtree of 10: post(15) = 12 15. Then root: 10.',
      ],
      concepts: ['postorder traversal', 'LRN', 'predict output'],
    },
    {
      id: 'c-tree-13',
      title: 'Free entire tree',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that frees all nodes of a binary tree.',
      skeleton: `// Write void free_tree(TreeNode *root) that deallocates all nodes.
// Use postorder so children are freed before the parent.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

void free_tree(TreeNode *root) {
    if (!root) return;
    free_tree(root->left);
    free_tree(root->right);
    free(root);
}

int main(void) {
    TreeNode *root = new_node(1);
    root->left = new_node(2);
    root->right = new_node(3);
    root->left->left = new_node(4);

    free_tree(root);
    printf("Tree freed\\n");
    return 0;
}`,
      hints: [
        'Must free children before freeing the parent (postorder).',
        'If you free parent first, you lose pointers to children.',
        'Base case: if root is NULL, just return.',
      ],
      concepts: ['free tree', 'postorder deletion', 'memory management'],
    },
    {
      id: 'c-tree-14',
      title: 'Check if valid BST',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that checks whether a binary tree is a valid BST.',
      skeleton: `// Write int is_bst(TreeNode *root)
// Return 1 if the tree satisfies BST property, 0 otherwise.
// Use min/max bounds approach.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

int is_bst_helper(TreeNode *root, long min, long max) {
    if (!root) return 1;
    if (root->data <= min || root->data >= max) return 0;
    return is_bst_helper(root->left, min, root->data) &&
           is_bst_helper(root->right, root->data, max);
}

int is_bst(TreeNode *root) {
    return is_bst_helper(root, LONG_MIN, LONG_MAX);
}

int main(void) {
    TreeNode *valid = new_node(10);
    valid->left = new_node(5);
    valid->right = new_node(15);
    printf("Valid BST: %d\\n", is_bst(valid));

    TreeNode *invalid = new_node(10);
    invalid->left = new_node(5);
    invalid->left->right = new_node(12);  // Violates: 12 > 10
    printf("Invalid BST: %d\\n", is_bst(invalid));
    return 0;
}`,
      hints: [
        'Each node must be within a valid range (min, max).',
        'Going left: max becomes the current node\'s data.',
        'Going right: min becomes the current node\'s data.',
      ],
      concepts: ['BST validation', 'range checking', 'recursive bounds'],
    },
    {
      id: 'c-tree-15',
      title: 'Fix wrong traversal order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix a function that claims to be inorder but is actually preorder.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;
TreeNode *nn(int d) { TreeNode *n = malloc(sizeof(TreeNode)); n->data=d; n->left=n->right=NULL; return n; }

// Bug: this is preorder, not inorder
void inorder(TreeNode *root) {
    if (!root) return;
    printf("%d ", root->data);   // Bug: prints before left
    inorder(root->left);
    inorder(root->right);
}

int main(void) {
    TreeNode *root = nn(2);
    root->left = nn(1);
    root->right = nn(3);
    printf("Inorder: ");
    inorder(root);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;
TreeNode *nn(int d) { TreeNode *n = malloc(sizeof(TreeNode)); n->data=d; n->left=n->right=NULL; return n; }

void inorder(TreeNode *root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

int main(void) {
    TreeNode *root = nn(2);
    root->left = nn(1);
    root->right = nn(3);
    printf("Inorder: ");
    inorder(root);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Inorder = Left, Node, Right (LNR).',
        'The print statement must come BETWEEN the two recursive calls.',
        'Preorder prints the node BEFORE recursing.',
      ],
      concepts: ['inorder vs preorder', 'traversal order', 'LNR'],
    },
    {
      id: 'c-tree-16',
      title: 'Fill-blank iterative inorder with stack',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete an iterative inorder traversal using an explicit stack.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

void inorder_iterative(TreeNode *root) {
    TreeNode *stack[256];
    int top = -1;
    TreeNode *cur = root;

    while (cur || top >= 0) {
        while (__BLANK__) {
            stack[++top] = cur;
            cur = cur->__BLANK__;
        }
        cur = stack[__BLANK__];
        printf("%d ", cur->data);
        cur = cur->__BLANK__;
    }
    printf("\\n");
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

void inorder_iterative(TreeNode *root) {
    TreeNode *stack[256];
    int top = -1;
    TreeNode *cur = root;

    while (cur || top >= 0) {
        while (cur) {
            stack[++top] = cur;
            cur = cur->left;
        }
        cur = stack[top--];
        printf("%d ", cur->data);
        cur = cur->right;
    }
    printf("\\n");
}`,
      hints: [
        'Push nodes and go left until NULL.',
        'Pop from stack, print, then go right.',
        'The outer loop continues while cur or stack is non-empty.',
      ],
      concepts: ['iterative inorder', 'explicit stack', 'Morris-like'],
    },
    {
      id: 'c-tree-17',
      title: 'Mirror a binary tree',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that mirrors (inverts) a binary tree.',
      skeleton: `// Write void mirror(TreeNode *root) that swaps left and right children
// at every node, recursively.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *new_node(int d) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d; n->left = n->right = NULL;
    return n;
}

void mirror(TreeNode *root) {
    if (!root) return;
    TreeNode *tmp = root->left;
    root->left = root->right;
    root->right = tmp;
    mirror(root->left);
    mirror(root->right);
}

void inorder(TreeNode *r) {
    if (!r) return;
    inorder(r->left);
    printf("%d ", r->data);
    inorder(r->right);
}

int main(void) {
    TreeNode *root = new_node(4);
    root->left = new_node(2);
    root->right = new_node(6);
    root->left->left = new_node(1);
    root->left->right = new_node(3);

    printf("Before: ");
    inorder(root);
    printf("\\n");

    mirror(root);

    printf("After:  ");
    inorder(root);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Swap left and right pointers at the current node.',
        'Then recursively mirror both subtrees.',
        'Base case: if root is NULL, return.',
      ],
      concepts: ['mirror tree', 'invert binary tree', 'swap children'],
    },
    {
      id: 'c-tree-18',
      title: 'Predict level-order output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the level-order (BFS) output of a tree.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct T { int d; struct T *l, *r; } T;
T *n(int d) { T *t = malloc(sizeof(T)); t->d=d; t->l=t->r=NULL; return t; }

void bfs(T *root) {
    T *q[64]; int f=0, r=0;
    q[r++] = root;
    while (f < r) {
        T *c = q[f++];
        printf("%d ", c->d);
        if (c->l) q[r++] = c->l;
        if (c->r) q[r++] = c->r;
    }
    printf("\\n");
}

int main(void) {
    T *root = n(1);
    root->l = n(2);
    root->r = n(3);
    root->l->l = n(4);
    root->l->r = n(5);
    root->r->l = n(6);
    root->r->r = n(7);
    bfs(root);
    return 0;
}`,
      solution: `1 2 3 4 5 6 7 `,
      hints: [
        'BFS visits nodes level by level: root, then level 1, then level 2.',
        'Level 0: 1. Level 1: 2, 3. Level 2: 4, 5, 6, 7.',
        'Complete binary tree with 7 nodes.',
      ],
      concepts: ['level-order', 'BFS output', 'complete binary tree'],
    },
    {
      id: 'c-tree-19',
      title: 'Refactor recursive to iterative search',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor a recursive BST search into an iterative one.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

// Recursive BST search
TreeNode *bst_search(TreeNode *root, int val) {
    if (!root || root->data == val)
        return root;
    if (val < root->data)
        return bst_search(root->left, val);
    return bst_search(root->right, val);
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *bst_search(TreeNode *root, int val) {
    while (root && root->data != val) {
        if (val < root->data)
            root = root->left;
        else
            root = root->right;
    }
    return root;
}`,
      hints: [
        'BST search is tail-recursive, so it converts easily to a loop.',
        'While root is not NULL and data does not match, follow left or right.',
        'Return root (either the found node or NULL).',
      ],
      concepts: ['tail recursion elimination', 'iterative search', 'BST'],
    },
    {
      id: 'c-tree-20',
      title: 'Refactor to use parent pointers',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a BST to include parent pointers for successor finding.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

// Current: no parent pointer, cannot find successor without root
typedef struct TreeNode { int data; struct TreeNode *left, *right; } TreeNode;

TreeNode *nn(int d) { TreeNode *n = malloc(sizeof(TreeNode)); n->data=d; n->left=n->right=NULL; return n; }

// To find inorder successor, we need to search from root
TreeNode *successor(TreeNode *root, TreeNode *node) {
    if (node->right) {
        TreeNode *cur = node->right;
        while (cur->left) cur = cur->left;
        return cur;
    }
    TreeNode *succ = NULL;
    while (root) {
        if (node->data < root->data) {
            succ = root;
            root = root->left;
        } else if (node->data > root->data) {
            root = root->right;
        } else break;
    }
    return succ;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int data;
    struct TreeNode *left, *right, *parent;
} TreeNode;

TreeNode *new_node(int d, TreeNode *parent) {
    TreeNode *n = (TreeNode *)malloc(sizeof(TreeNode));
    n->data = d;
    n->left = n->right = NULL;
    n->parent = parent;
    return n;
}

TreeNode *bst_insert(TreeNode *root, int val, TreeNode *parent) {
    if (!root) return new_node(val, parent);
    if (val < root->data)
        root->left = bst_insert(root->left, val, root);
    else if (val > root->data)
        root->right = bst_insert(root->right, val, root);
    return root;
}

TreeNode *successor(TreeNode *node) {
    if (node->right) {
        TreeNode *cur = node->right;
        while (cur->left) cur = cur->left;
        return cur;
    }
    TreeNode *p = node->parent;
    while (p && node == p->right) {
        node = p;
        p = p->parent;
    }
    return p;
}

int main(void) {
    TreeNode *root = NULL;
    int vals[] = {20, 10, 30, 5, 15, 25, 35};
    for (int i = 0; i < 7; i++)
        root = bst_insert(root, vals[i], NULL);

    TreeNode *n = root->left->right;  // node 15
    TreeNode *s = successor(n);
    printf("Successor of %d: %d\\n", n->data, s ? s->data : -1);
    return 0;
}`,
      hints: [
        'Add a parent pointer to each node.',
        'If node has right child, successor is leftmost of right subtree.',
        'Otherwise, walk up via parent until you find an ancestor from the left.',
      ],
      concepts: ['parent pointer', 'inorder successor', 'tree augmentation'],
    },
  ],
};
