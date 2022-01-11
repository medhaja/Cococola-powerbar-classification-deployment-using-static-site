window.alert("Just a heads up! We'll ask to access your webcam so that we can detect objects in semi-real-time.\n\nDon\'t worry, we aren\'t sending any of your images to a remote server, all the ML is being done locally on device, and you can check out our source code on Github.");

var player = document.getElementById("player");
      var captureButton = document.getElementById("capture");
      var stopButton = document.getElementById("stop");

      var handleSuccess = function (stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);

      stopButton.addEventListener("click", function () {
        stream = player.srcObject;
        tracks = stream.getTracks();
        tracks.forEach(function (track) {
          track.stop();
        });
        player.srcObject = null;
      });
      captureButton.addEventListener("click", async function () {
        // Load the model.
        net = await tf.loadLayersModel('https://raw.githubusercontent.com/medhaja/test2/main/Weights/model.json');
        console.log('Model loaded!!');



        // Create an object from Tensorflow.js data API which could capture image
        // from the web camera as Tensor.
        const webcam = await tf.data.webcam(player, {
          resizeWidth: 224,
          resizeHeight: 224,
        });
        

        const img = await webcam.capture();



        const result = await net.predict(img.expandDims())
        // function for geting the largest floating element index from array
        function getIndexOfMax(arr) {
          if (arr.length === 0) {
            return -1;
          }

          var max = arr[0];
          var maxIndex = 0;

          for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
              maxIndex = i;
              max = arr[i];
            }
          }

          return maxIndex;
        }
        // get the index of the largest element in the array
        let index = getIndexOfMax(result.dataSync());
        let label = result.dataSync()[index];
        // console.log(label);
        let labelName = ['coco cola', 'power bar']
        let resultLabel = `${labelName[index]}`;
        console.log(resultLabel);
        document.getElementById('console').innerHTML = resultLabel;
        document.getElementById('console').style.fontWeight = 'bold';
        document.getElementById('console').style.color = 'red';
        document.getElementById('console').style.padding = '10px';
        document.getElementById('console').style.margin = '10px';
        document.getElementById('console').style.fontSize = '20px';
        document.getElementById('console').style.fontFamily = 'Arial';
        document.getElementById('console').style.fontWeight = 'bold';
        document.getElementById('console').style.textAlign = 'center';
        document.getElementById('console').style.textTransform = 'uppercase';
        document.getElementById('console').style.textShadow = '1px 1px 1px yellow';


        img.dispose();
        webcam.dispose();
      });
