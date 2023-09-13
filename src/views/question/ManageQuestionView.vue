<template>
  <div id="manageQuestionView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="justify-content: center; align-content: center; margin: 25px"
    >
      <a-form-item field="title" label="题目：" tooltip="请输入搜索的题目">
        <a-input v-model="searchParams.title" placeholder="请输入搜索题目" />
      </a-form-item>
      <a-form-item field="title" label="用户：" tooltip="请输入用户的id">
        <a-input v-model="searchParams.userId" placeholder="请输入搜索用户" />
      </a-form-item>
      <a-form-item field="title" label="题目内容" tooltip="请输入题目内容">
        <a-input v-model="searchParams.content" placeholder="请输入题目内容" />
      </a-form-item>
      <a-form-item
        field="tags"
        label="题目标签："
        tooltip="请输入搜索题目标签"
        style="min-width: 280px"
      >
        <a-input-tag v-model="searchParams.tags" placeholder="请输入题目标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="outline" shape="round" status="normal" @click="doSubmit"
          >搜索
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :column-resizable="true"
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
        showJumper: true,
        showPageSize: true,
      }"
      @page-change="onPageChange"
      @pageSizeChange="onPageSizeChange"
    >
      <template #id="{ record }">
        <a-link
          status="normal"
          style="color: blue"
          @click="toQuestionPage(record)"
          >{{ record.id }}
        </a-link>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of JSON.parse(record.tags)"
            :key="index"
            color="cyan"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #judgeConfig="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(config, index) of JSON.parse(record.judgeConfig)"
            :key="index"
            color="orangered"
            >{{
              `${
                index === "timeLimit"
                  ? "时间(ms)"
                  : index === "memoryLimit"
                  ? "内存(Kb)"
                  : "堆栈(Kb)"
              }`
            }}
            {{ "：" + config }}
          </a-tag>
        </a-space>
      </template>
      <template #judgeCase="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(config, index) of JSON.parse(record.judgeCase)"
            :key="index"
            color="blue"
            >示例{{ index + 1 }}: 输入：{{ config.input }} ，输出：{{
              config.output
            }}
          </a-tag>
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button shape="round" type="outline" @click="doUpdate(record)"
            >修改
          </a-button>
          <a-popconfirm
            content="确定要删除此题目吗?"
            type="error"
            okText="是"
            cancelText="否"
            @cancel="
              () => {
                console.log(`已取消`);
              }
            "
            @ok="doDelete(record)"
          >
            <a-button shape="round" type="outline" status="danger"
              >删除
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../backapi/index";
import message from "@arco-design/web-vue/es/message";

import { useRouter } from "vue-router";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  userId: undefined,
  tags: [],
  title: "",
  pageSize: 10,
  current: 1,
  content: "",
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost({
    ...searchParams.value,
    sortField: "createTime",
    sortOrder: "descend",
  });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "题号",
    slotName: "id",
    align: "center",
  },
  {
    title: "创建者",
    dataIndex: "userId",
    align: "center",
  },
  {
    title: "题目",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "内容",
    dataIndex: "content",
    align: "center",
    width: 250,
  },
  {
    title: "标签",
    slotName: "tags",
    align: "center",
    width: 150,
  },
  {
    title: "答案",
    dataIndex: "answer",
    align: "center",
    width: 150,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "题目要求",
    slotName: "judgeConfig",
    align: "center",
  },
  {
    title: "判题用例",
    slotName: "judgeCase",
    align: "center",
    width: 120,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
  },
];
/**
 * 分页
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 分页大小
 * @param size
 */
const onPageSizeChange = (size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: size,
  };
};

/**
 * 删除
 * @param question
 */
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (questionId: QuestionSubmitQueryRequest) => {
  router.push({
    path: `/question/view/${questionId.questionId}`,
  });
};

/**
 * 修改 / 更新操作
 * @param question
 */
const doUpdate = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};
/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#manageQuestionView {
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}
</style>
