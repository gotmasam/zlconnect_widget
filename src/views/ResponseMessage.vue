<template>
    <div class="response-message">
      <h2>応答メッセージ</h2>
      
      <!-- フォーム -->
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">タイトル:</label>
          <input type="text" id="title" v-model="formData.title" required />
        </div>
  
        <div>
          <label for="keyword">キーワード:</label>
          <input type="text" id="keyword" v-model="formData.keyword" required />
        </div>
  
        <div>
          <label for="matchMethod">マッチ方法:</label>
          <select id="matchMethod" v-model="formData.matchMethod">
            <option value="partial">部分一致</option>
            <option value="exact">完全一致</option>
          </select>
        </div>
  
        <div>
          <label for="messageType">メッセージタイプ:</label>
          <select id="messageType" v-model="formData.messageType">
            <option value="text">テキスト</option>
            <option value="image">画像</option>
          </select>
        </div>
  
        <!-- メッセージタイプが「テキスト」の場合にメッセージ入力 -->
        <div v-if="formData.messageType === 'text'">
          <label for="message">メッセージ:</label>
          <textarea id="message" v-model="formData.message" required></textarea>
        </div>
  
        <!-- メッセージタイプが「画像」の場合に画像選択 -->
        <div v-if="formData.messageType === 'image'">
          <label for="image">画像:</label>
          <input type="file" id="image" @change="handleImageUpload" />
        </div>
  
        <button type="submit">送信</button>
      </form>
    </div>
  </template>
  
  <script>
  import { responseMessageSubmitRecord } from '../js/ResponseMessage.js';
  export default {
    data() {
      return {
        formData: {
          title: '',
          keyword: '',
          matchMethod: 'partial',
          messageType: 'text',  // 初期値を「テキスト」に設定
          message: ''
        },
        imageFile: null // 画像ファイルを保持する変数
      };
    },
    methods: {
      // 画像のアップロード時に処理を行うメソッド
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;  // 選択された画像ファイルを格納
        }
      },
      // フォーム送信時の処理
      async submitForm() {
        try {
            // フォームデータをZoho Creatorに送信
            const response = await responseMessageSubmitRecord(this.formData);
            console.log('Response:', response);
            alert('レコードが正常に追加されました！');
        } catch (error) {
            console.error('Error:', error);
            alert('エラーが発生しました。');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  }
  
  div {
    margin-bottom: 1em;
  }
  
  label {
    font-weight: bold;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>