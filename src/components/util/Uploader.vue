<template>
  <div class="uploader">
    <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        accept=".wav,.mp3"
        :beforeUpload="beforeUpload"
        @change="handleChange"
        @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined/>
      </p>
      <p class="ant-upload-text">点击或拖拽上传</p>
      <p class="ant-upload-hint">
        请上传wav或mp3格式的文件
      </p>
    </a-upload-dragger>
    <div style="padding-top: 10px">
      <a-button type="primary" @click="uploadFile">
        上传
      </a-button>
    </div>
  </div>
</template>

<script>
import {message} from "ant-design-vue";
import {ref} from "vue";
import {UploadDragger} from "ant-design-vue";
import {InboxOutlined} from "@ant-design/icons-vue";
import request from "@/utils/request";
import axios from "axios";

export default {
  name: "Uploader",
  components: {
    UploadDragger,
    InboxOutlined
  },
  props: {

  },
  data() {
    return {
      fileList: [],
    }
  },
  setup() {
    const handleChange = info => {
      const status = info.file.status;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      else if (status === 'error') {
        message.error(`${info.file.name} file upload to queue failed.`);
      }
    };

    const beforeUpload = (file, fileList) => {
      // console.log(file);
      this.fileList = [...this.fileList, file];
    }

    return {
      handleChange,
      beforeUpload,
      fileList: ref([]),
      handleDrop: e => {
        // console.log(e);
      },
    };
  },
  methods: {
    uploadFile() {
      // 后端默认userId=2代表GUEST上传，所以这里如果user===null，也可以不传userId这个param
      let user = JSON.parse(sessionStorage.getItem("user-login"));
      let userId = 2;
      if (user !== null)
        userId = user.userId;

      // fileUploader是设置了multipart/form-data的axios请求器，调用后可以对后端发起一次文件上传请求
      let fileUploader = (file_num = 0) => axios({
        url: '/universal-prefix/file/upload',
        method: 'post',
        data: {file: this.fileList[file_num].originFileObj},
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.code === 'CODE_200') {
          message.success("File upload succeeded.");
          // console.log(res.data);
          sessionStorage.setItem('origin-file-' + file_num, res.data.data);
        } else {
          message.error(res.data.code + "\n" + res.data.data);
        }
      });

      // 后续如果要批量上传、批量分离，可以在后端增加对应的批处理接口，减少前端的负载
      for (let i = 0; i < this.fileList.length; i++) {
        // console.log(this.fileList[i].originFileObj);
        fileUploader(i);
      }

      this.fileList = [];
    },
  }
}
</script>

<style scoped>
.uploader {
  width: 200px;
  height: 180px;
  padding: 5px;
}
</style>