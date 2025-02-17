// function loadZohoCreatorSDK() {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.src = 'https://js.zohostatic.com/creator/widgets/version/1.0/widgetsdk-min.js';
//     script.type = 'text/javascript';
//     script.onload = () => resolve();  // スクリプト読み込み成功時に解決
//     script.onerror = () => reject(new Error('Failed to load Zoho Creator SDK'));  // スクリプト読み込み失敗時にリジェクト
//     document.head.appendChild(script);  // <head> に追加してスクリプトを読み込む
//   });
// }
function loadZohoCreatorSDK() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.zohostatic.com/creator/widgets/version/1.0/widgetsdk-min.js';
    script.type = 'text/javascript';
    script.onload = () => {
      console.log('Zoho Creator SDK loaded');
      resolve();  // SDKが読み込まれたらresolve
    };
    script.onerror = () => {
      reject(new Error('Failed to load Zoho Creator SDK'));
    };
    document.head.appendChild(script);  // <head> に追加してスクリプトを読み込む
  });
}

export function responseMessageSubmitRecord(formData) {
  return new Promise((resolve, reject) => {
    // Zohoプラグイン
    const ZOHO = window.ZOHO;
    ZOHO.CREATOR.init();
    ZOHO.CREATOR.UTIL.getWidgetParams().then((response) => {
      console("getWidgetParams");
      console(response);
      })
    loadZohoCreatorSDK()
      .then(() => {
        console.log('Zoho Creator SDK loaded');
        console.log(ZOHO.CREATOR);

        // SDKが完全に初期化されていることを確認する
        if (typeof ZOHO.CREATOR.init === 'function') {
          console.log('ZOHO.CREATOR.init is available');

          // init() を呼び出して初期化が成功したら処理を続ける
          // ZOHO.CREATOR.init()
          //   .then(function() {
              console.log('ZOHO.CREATOR initialized successfully');
              // ここからレコード追加処理など
              var appName = "-zl-connect";
              var formLinkName = "response_message";
              let apiFormData = {
                data: {}
              };

              apiFormData.data["title"] = formData.title;
              apiFormData.data["keyword"] = formData.keyword;
              if (formData.matchMethod === "partial") {
                apiFormData.data["match_type"] = "部分一致";
              } else if (formData.matchMethod === "exact") {
                apiFormData.data["match_type"] = "完全一致";
              }
              if (formData.messageType === "text") {
                apiFormData.data["message_type"] = "テキスト";
                apiFormData.data["message"] = formData.message;
              } else if (formData.messageType === "image") {
                apiFormData.data["message_type"] = "画像";
              }

              console.log('apiFormData:', apiFormData);

              // 画像がある場合
              if (formData.messageType === "image" && formData.imageFile) {
                const reader = new FileReader();

                reader.onloadend = function () {
                  const base64Image = reader.result;
                  apiFormData.data["image"] = base64Image;

                  // レコード追加処理
                  const config = {
                    workspace_name: "user1_demo159",
                    appName : appName,
                    formName: formLinkName,
                    data: apiFormData
                  };

                  var addRecord = ZOHO.CREATOR.API.addRecord(config);
                  addRecord.then(function (jsonData) {
                    resolve(jsonData);  // 成功時
                  }).catch(function (data) {
                    reject(data);  // エラー時
                  });
                };

                // 画像をBase64に変換
                reader.readAsDataURL(formData.imageFile);
              } else {
                // 画像がない場合、そのまま送信
                const config = {
                  workspace_name: "user1_demo159",
                  appName : appName,
                  formName: formLinkName,
                  data: apiFormData
                };
                var addRecord = ZOHO.CREATOR.API.addRecord(config);
                addRecord.then(function (jsonData) {
                  resolve(jsonData);  // 成功時
                }).catch(function (data) {
                  reject(data);  // エラー時
                });
              }
            // })
            // .catch(function(error) {
            //   console.error('Error initializing Zoho Creator SDK:', error);
            //   reject(error);
            // });
        } else {
          console.error('ZOHO.CREATOR.init is not available');
          reject('ZOHO.CREATOR.init is not available');
        }
      })
      .catch((error) => {
        reject(error);  // SDK読み込みエラー
      });
  });
}









// function loadZohoCreatorSDK() {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = 'https://js.zohostatic.com/creator/widgets/version/1.0/widgetsdk-min.js';
//       script.type = 'text/javascript';
//       script.onload = () => resolve();  // スクリプト読み込み成功時に解決
//       script.onerror = () => reject(new Error('Failed to load Zoho Creator SDK'));  // スクリプト読み込み失敗時にリジェクト
//       document.head.appendChild(script);  // <head> に追加してスクリプトを読み込む
//     });
//   }
  
//   export function responseMessageSubmitRecord(formData) {
//     return new Promise((resolve, reject) => {
//       loadZohoCreatorSDK()
//         .then(() => {
//           console.log('Zoho Creator SDK loaded');
//           // SDKが読み込まれた後、ZOHO.CREATOR.init() を呼び出す
//           var creatorSdkPromise = ZOHO.CREATOR.init();
//           creatorSdkPromise
//             .then(() => {

//               console.log('creatorSdkPromise successfully');

//               var formLinkName = "response_message";
//               let apiFormData = {
//                 data: {}
//               };

//               apiFormData.data["title"] = formData.title;
//               apiFormData.data["keyword"] = formData.keyword;
//               if (formData.matchMethod === "partial") {
//                 apiFormData.data["match_type"] = "部分一致";
//               } else if (formData.matchMethod === "exact") {
//                 apiFormData.data["match_type"] = "完全一致";
//               }
//               if (formData.messageType === "text") {
//                 apiFormData.data["message_type"] = "テキスト";
//                 apiFormData.data["message"] = formData.message;
//               } else if (formData.messageType === "image") {
//                 apiFormData.data["message_type"] = "画像";
//               }
  
//               console.log('apiFormData');
//               console.log(apiFormData);

//               // メッセージタイプが「画像」の場合
//               if (formData.messageType === "image" && formData.imageFile) {
//                 // 画像ファイルをBase64形式に変換
//                 const reader = new FileReader();
  
//                 reader.onloadend = function () {
//                   const base64Image = reader.result;  // Base64エンコードされた画像データ
  
//                   // Base64形式で画像データを格納
//                   apiFormData.data["image"] = base64Image;
  
//                   // レコードの追加処理
//                   const config = {
//                     formName: formLinkName,
//                     data: apiFormData
//                   };

//                   console.log('config');
//                   console.log(config);
//                   var addRecord = ZOHO.CREATOR.API.addRecord(config);
//                   addRecord.then(function (jsonData) {
//                     resolve(jsonData);  // 成功時にデータを返す
//                   }).catch(function (data) {
//                     reject(data);  // エラー時にリジェクト
//                   });
//                 };
  
//                 // 画像ファイルを読み込む（Base64形式に変換）
//                 reader.readAsDataURL(formData.imageFile);
//               } else {
//                 // 画像がない場合はそのまま送信
//                 const config = {
//                   formName: formLinkName,
//                   data: apiFormData
//                 };

//                 console.log('config');
//                 console.log(config);
//                 var addRecord = ZOHO.CREATOR.API.addRecord(config);
//                 addRecord.then(function (jsonData) {
//                   resolve(jsonData);  // 成功時にデータを返す
//                 }).catch(function (data) {
//                   reject(data);  // エラー時にリジェクト
//                 });
//               }
//             })
//             .catch(function (data) {
//               reject(data);  // SDK 初期化エラー時にリジェクト
//             });
//         })
//         .catch((error) => {
//           reject(error);  // スクリプト読み込みエラー
//         });
//     });
//   }
