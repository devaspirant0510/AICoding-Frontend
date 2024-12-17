export default class Constants {
    static provideLanguage = [
        {name: 'Java', mode: 'java'},
        {name: 'Python', mode: 'python'},
        {name: 'GO', mode: 'golang'},
        {name: 'C', mode: 'c_cpp'},
        {name: 'C++', mode: 'c_cpp'},
    ]
    static provideCodeReviewLanguage = [
        { name: 'ABAP', mode: 'abap' },
        { name: 'ABC', mode: 'abc' },
        { name: 'ActionScript', mode: 'actionscript' },
        { name: 'Ada', mode: 'ada' },
        { name: 'Assembly x86', mode: 'assembly_x86' },
        { name: 'C', mode: 'c_cpp' },
        { name: 'C++', mode: 'c_cpp' },
        { name: 'Clojure', mode: 'clojure' },
        { name: 'COBOL', mode: 'cobol' },
        { name: 'CoffeeScript', mode: 'coffee' },
        { name: 'C#', mode: 'csharp' },
        { name: 'CSS', mode: 'css' },
        { name: 'D', mode: 'd' },
        { name: 'Dart', mode: 'dart' },
        { name: 'Elixir', mode: 'elixir' },
        { name: 'Erlang', mode: 'erlang' },
        { name: 'Go', mode: 'golang' },
        { name: 'HTML', mode: 'html' },
        { name: 'Java', mode: 'java' },
        { name: 'JavaScript', mode: 'javascript' },
        { name: 'Kotlin', mode: 'kotlin' },
        { name: 'Lua', mode: 'lua' },
        { name: 'MATLAB', mode: 'matlab' },
        { name: 'PHP', mode: 'php' },
        { name: 'Python', mode: 'python' },
        { name: 'Ruby', mode: 'ruby' },
        { name: 'Rust', mode: 'rust' },
        { name: 'SQL', mode: 'sql' },
        { name: 'TypeScript', mode: 'typescript' },
    ];
    static pythonSnippet = `print("Hello, World!")`;

    static javaSnippet = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

    static goSnippet = `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`;

    static cSnippet = `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`;

    static cppSnippet = `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;
    static codingTestCategories = [
        "기초",
        "배열",
        "스택과 큐",
        "연결 리스트",
        "해시맵과 셋",
        "트리와 이진 트리",
        "그래프",
        "힙과 우선순위 큐",
        "트라이",
        "정렬",
        "이진 탐색",
        "DFS와 BFS",
        "동적 프로그래밍",
        "그리디 알고리즘",
        "백트래킹",
        "슬라이딩 윈도우",
        "투 포인터",
        "문자열 검색",
        "회문과 아나그램",
        "소수와 약수",
        "조합론과 순열",
        "기하학",
        "비트 연산",
        "수열과 행렬",
        "분할 정복",
        "최소 스패닝 트리",
        "최단 경로 알고리즘",
        "네트워크 플로우",
        "게임 이론",
        "시뮬레이션",
        "브루트 포스",
        "최적화 문제",
        "확률과 통계",
        "정수론",
        "기타"
    ];

    static quizCategory = [
        {
            cname: 'Programming Languages',
            items: [
                {name: 'Python'},
                {name: 'JavaScript'},
                {name: 'Java'},
                {name: 'C++'},
                {name: 'Ruby'},
                {name: 'Go'},
                {name: 'Rust'},
                {name: 'Kotlin'},
                {name: 'TypeScript'},
                {name: 'C#'},
                {name: 'Swift'},
                {name: 'PHP'},
                {name: 'R'},
                {name: 'Dart'},
                {name: 'Objective-C'},
                {name: 'Perl'},
                {name: 'SQL'},
            ]
        },
        {
            cname: 'Libraries / Frameworks',
            items: [
                {name: 'React'},
                {name: 'Vue.js'},
                {name: 'Angular'},
                {name: 'Svelte'},
                {name: 'Node.js'},
                {name: 'Express.js'},
                {name: 'Spring Boot'},
                {name: 'Django'},
                {name: 'Ruby on Rails'},
                {name: 'Flutter'},
                {name: 'React Native'},
                {name: 'Next.js'},
                {name: 'NestJS'},
                {name: 'TensorFlow'},
                {name: 'PyTorch'},
                {name: 'Keras'},
                {name: 'FastAPI'},
                {name: 'GraphQL'},
                {name: 'REST API'},
                {name: 'Docker'},
                {name: 'Kubernetes'},
            ]
        },
        {
            cname: 'Other (AI, CS Technologies)',
            items: [
                {name: 'Computer Science'},
                {name: 'Algorithms'},
                {name: 'Data Structures'},
                {name: 'Operating Systems'},
                {name: 'Computer Networks'},
                {name: 'Artificial Intelligence'},
                {name: 'Machine Learning'},
                {name: 'Deep Learning'},
                {name: 'Natural Language Processing'},
                {name: 'Computer Vision'},
                {name: 'Reinforcement Learning'},
                {name: 'Blockchain'},
                {name: 'Robotics'},
                {name: 'Game Development'},
                {name: 'Cloud Computing'},
                {name: 'Big Data'},
                {name: 'Other'}
            ]
        }
    ];

}