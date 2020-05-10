navigator.webkitGetUserMedia ({video:true, audio:true},function(stream){

    var Peer = require('simple-peer')
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle:false,
        stream:stream
    })

    peer.on('signal', function(data){
        document.getElementById('yourId').value=JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click',function(){
        var otherId= JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click',function()
    {
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
        document.getElementById('yourMessage').value="";
        
    })

    peer.on('data',function (data){
        document.getElementById('messages').textContent += data + '\n'
    })
    peer.on('stream', function(stream){
        var video= document.createElement('video') 
        document.body.appendChild(video)

        try {
            video.srcObject = stream;
          } catch (error) {
            video.src = window.URL.createObjectURL(stream);
          }
        video.play()
    }) 
    var myvideo = document.getElementById('myvideo'),
		vendorUrl = window.webkitURL;
		try{
			myvideo.srcObject= stream;
		}catch(error){
            myvideo.src=vendorUrl.createObjectURL(stream);
		}
        myvideo.play();
},function(err){
    console.error(err)
})
document.getElementById('stop').addEventListener('click',function(){
    navigator.webkitGetUserMedia({video:false,audio:true},function(stream){
        try{
            myvideo.srcObject=stream;
        }catch(error){
            myvideo.src=vendorUrl.createObjectURL(stream);
            myvideo.src="null"
        }
   },function(err){
        console.error(err);
    })
})
document.getElementById('start').addEventListener('click',function(){
    navigator.webkitGetUserMedia({video:true,audio:false},function(stream){
        try{
            myvideo.srcObject=stream;
        }catch(error){
            myvideo.src=window.URL.createObjectURL(stream);
        }
   },function(err){
        console.error(err);
    })
})
