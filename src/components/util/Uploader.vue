<template>
  <div class="uploader">
    <a-upload-dragger
        :fileList="null"
        name="file"
        accept=".wav,.mp3"
        :multiple="false"
        @change="handleChange"
        @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined/>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for files in WAV or MP3 format
      </p>
    </a-upload-dragger>
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
    // 'sourceUrlIdx': {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
    }
  },
  setup() {
    // let fileList = [];
    let originFile = ref();

    // fileUploader是设置了multipart/form-data的axios请求器，调用后可以对后端发起一次文件上传请求
    let fileUploader = (file_num = 0) => {
      message.info("uploading...");
      axios({
        url: '/universal-prefix/file/upload',
        method: 'post',
        // data: {file: fileList[file_num].originFileObj},
        data: {file: originFile.originFileObj},
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.code === 'CODE_200') {
          // message.success("File upload succeeded.");
          sessionStorage.setItem('source-file-url', res.data.data);
        } else {
          message.error(res.data.code + "\n" + res.data.data);
        }
      })
    };

    const handleChange = info => {
      const status = info.file.status;
      // fileList = [...fileList, info.file];
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      else if (status === 'error') {
        message.error(`${info.file.name} file upload to queue failed.`);
      }
      originFile = info.file;
      // sessionStorage.setItem('source-file', originFile);
      fileUploader(0);
    };

    const beforeUpload = (file, fileList) => {
      // console.log(file);
      // this.fileList = [...this.fileList, file];
    }

    return {
      fileUploader,
      handleChange,
      beforeUpload,
      // fileList,
      originFile,
      handleDrop: e => {
        // console.log(e);
      },
    };
  },
  methods: {
    message() {
      return message
    },
  }
}
</script>

<style scoped>
.uploader {
  width: 52%;
  height: 33%;
  margin: 2%;
}
</style>