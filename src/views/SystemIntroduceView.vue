<template>
  <div id="introduceView">
    <a-typography :style="{ marginTop: '-40px' }">
      <a-typography-title> Cat OJ 判题系统</a-typography-title>
      <a-typography-paragraph>
        用户可以选择题目，在线做题，编写代码并且提交代码；系统会对用户提交的代码，根据我们出题人设置的答案，来判断用户的提交结果是否正确。
      </a-typography-paragraph>
      <a-typography-title :heading="2">1、项目难点</a-typography-title>
      <a-typography-paragraph>
        用于在线评测编程题目代码的系统，能够根据用户提交的代码、出题人预先设置的题目输入和输出用例，进行编译代码、运行代码、判断代码运行结果是否正确。
        <a-typography-text mark>判题系统</a-typography-text>
      </a-typography-paragraph>
      <a-typography-title :heading="2">2、项目背景</a-typography-title>
      <a-typography-paragraph>
        OJ（Online
        Judge）系统是一个在线编程评测系统，用户可以选择题目、编写代码并提交代码进行评测。然而，OJ
        系统的核心难点在于判题系统的设计与实现，需要能够编译、执行和评测用户代码，并与出题人设置的答案进行对比。
        目标是开发一个高效、稳定的 OJ
        在线判题评测系统，支持多种编程语言，能够自动编译、执行和评测用户的代码。通过提供优质的在线编程评测服务，我们希望推动编程教育的发展，促进学习者的成长。
      </a-typography-paragraph>

      <a-typography-title :heading="2">3、项目核心亮点</a-typography-title>
      <a-typography-paragraph>
        <ol>
          <li>权限校验 ：谁能提代码，谁不提代码</li>
          <li>
            代码沙箱（安全沙箱）
            <ul>
              <li>用户代码藏毒：写个木马文件、修改系统权限</li>
              <li>
                沙箱：隔离的、安全的环境，用户的代码不会影响到沙箱之外的系统的运行
              </li>
              <li>
                资源分配：系统的内存就2个G,用户疯狂占用资源占满你的内存，其他人就用不了了。所以要限制用户程序的占用资源。
              </li>
              <li></li>
            </ul>
          </li>
          <li>
            判题规则
            <ul>
              <li>题目用例的比对，结果的验证</li>
            </ul>
          </li>
          <li>
            任务调度
            <ul>
              <li>
                服务器资源有限，用户要排队，按照顺序去依次执行判题，而不是直接拒绝
              </li>
            </ul>
          </li>
        </ol>
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>
<style scoped>
#introduceView {
  margin: 0 auto;
  max-width: 1024px;
}
</style>
