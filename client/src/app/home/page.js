"use client"
import { useEffect, useState } from 'react'
import { Box,Typography,Grid} from "@mui/material"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';


import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import TweetButton from './TweetBottun';


const CalList = [];

const PostToServer = async (acc) => {
  const response = await fetch("https://8795-150-31-93-196.ngrok-free.app/api", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
      });
  
  const result = await response.json();
  console.log('===========result===========\n' + result.message);
  CalList.push(result.message);
} 

const meanCalorie = () => {
  let sum = 0;
  for (let i = 0; i < CalList.length; i++) {
    sum += Number(CalList[i]);
  }
  const mean = sum / CalList.length;
  console.log('mean = sum / CalList.length',sum, CalList.length)
  console.log("平均カロリー:" + mean + "kcal");
  return mean;
}


const yourType = (CalList, mean) => {

  const diff = Math.max(CalList) - Math.min(CalList);
  let type = "";
  if (diff > 1.0 && mean < 1.0) {
    console.log('ゴールキーパー')
    type = 'ゴールキーパー'
  } else if (diff > 0.5 ) {
    console.log('フォワード or ディフェンダー')
    type = 'フォワード or ディフェンダー'
  }
  else if (0.2 < diff < 0.5){
    console.log('ミッドフィルダー')
    type = 'ミッドフィルダー'
  }
  else if (diff < 0.2) {
    console.log('ユーティリティ')
    type = 'ユーティリティ'
  }

  return type;
}

export default function Home(){
      //１秒ごとに更新される三次元の加速度
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [z,setZ] = useState(0);

  const [xyzlist,setXYZlist] = useState([{x:0,y:0,z:0}]);

  const [acc, setAcc] = useState({
    "weight": 60,
    "DATA": xyzlist
  });

  const [isStart,setIsStart] = useState(false)
  useEffect(() => {
    // 加速度センサーイベント処理
    console.log("start_sensor");
    let accX;
    let accY;
    let accZ;
    const handleDeviceAcceleration = function(e){
      accX = e.acceleration.x;
      accY = e.acceleration.y;
      accZ = e.acceleration.z;
    };
    const intervalId = setInterval(()=>{
      setX(accX); 
      setY(accY);
      setZ(accZ);
    },100);

    window.addEventListener("devicemotion", handleDeviceAcceleration, false);
    
    // イベントリスナーをクリーンアップ
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceAcceleration, false);
    };
  }, []);

  useEffect(() => {
    console.log("accが更新されました")
    console.log(acc)
    PostToServer(acc);
}
,[acc])

  useEffect(()=>{
    if (!isStart){
        setXYZlist((p)=>[{x:x,y:y,z:z}])
    }
    else if (xyzlist.length < 100)  {
      setXYZlist((p)=>[...p,{x:x,y:y,z:z}])
    }
    else {
      setXYZlist((p)=>[{x:x,y:y,z:z}])
      if (isStart){
        console.log("fetch API!!!!!!!!!!!!!!!!!!!!!!!!!!")

        setAcc((prevAcc) => ({
          ...prevAcc,
          DATA: xyzlist,
        }));
      }
    }
    console.log(xyzlist)
  },[x,y,z]
  )

  const [mean,setMean] = useState(0);
  const toggleStart = () =>{
    setIsStart((p) =>!p);
    console.log("toggle");
    if (isStart){
      console.log("平均カロリーを計算")
      setMean(meanCalorie());
      console.log("あなたのポジションは",yourType(CalList, mean));
    }
  }
    return (
        <Box sx={{bgcolor:"rgba(23,61,123,1)"}}bgcolor="#17337B" display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12}><img src='https://naraclub.jp/cms/wp-content/uploads/2019/03/nc-symbol.png'/></Grid>
            <Grid item xs={12}>
            <Box  display="flex" justifyContent="center" alignItems="center"> 
            {isStart?<PauseCircleOutlineIcon sx={{  color: "rgba(196, 41, 63, 1)",fontSize: 300 } } onClick={toggleStart} />:
            <PlayCircleOutlineIcon sx={{  color: "rgba(196, 41, 63, 1)",fontSize: 300 } } onClick={toggleStart} />}
            </Box>
            </Grid>
            <Grid item xs={12}>
              <Box  display="flex" justifyContent="center" alignItems="center" mt={6}> 
                <ResultDialog />
              </Box>
            
            </Grid>
          </Grid>

        </Box>
    )
}

function ResultDialog(position) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function Gk (){return (<DialogContent>
  <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="赤塚 怜"
        subheader="GK1"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://naraclub.jp/cms/wp-content/uploads/2023/02/a211e10e233918b61b066dfaf73d00a0.jpg"
        alt="赤塚 怜"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          全てをかけて奈良のために闘います
        </Typography>
      </CardContent>
    </Card>
  </DialogContent>)}

function Df (){return (<DialogContent>
  <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="伊勢 渉"
        subheader="DF4"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://naraclub.jp/cms/wp-content/uploads/2023/02/865e946d481425320336b138090ce643.jpg"
        alt="伊勢 渉"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        今シーズンも一緒にサッカーで奈良を盛り上げましょう！！
        </Typography>
      </CardContent>
    </Card>
  </DialogContent>)}


function Mf (){return (<DialogContent>
  <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="桑島 良汰"
        subheader="MF7"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://naraclub.jp/cms/wp-content/uploads/2023/02/32f2ff94446caf068856d56c5cc345b5.jpg"
        alt="桑島 良汰"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          今年も共に戦いましょう
        </Typography>
      </CardContent>
    </Card>
  </DialogContent>)}

function Fw (){return (<DialogContent>
  <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="酒井 達磨"
        subheader="FW19"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://naraclub.jp/cms/wp-content/uploads/2023/02/50103a3db26a29dced69642f83925d3d.jpg"
        alt="酒井 達磨"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        2023シーズン最高の1年にしましょう！！！
        </Typography>
      </CardContent>
    </Card>
  </DialogContent>)}

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{textAlign:"center",color: "rgba(196, 41, 63, 1)"}}>
        Open Result
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
      
        <DialogTitle>{"??タイプ"}</DialogTitle>
        <Box  display="flex" justifyContent="center" alignItems="center"> 
        <Typography>あなたの消費calはXXX! </Typography>
        <br/>
        <Typography>??の平均:XXX</Typography>
        </Box>
        <Fw></Fw>
        
        <DialogActions>
        <Button onClick={handleClose}>閉じる</Button>
          <TweetButton text={"テスト"} hashtags={"奈良クラブ"}/>
        </DialogActions>
      </Dialog>
    </div>
  );
  
}

