import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'

export function attempts_Number(result){
  return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point){
  return result
    .map((element, i) => answers[i] === element)
    .filter(Boolean)
    .map(() => point)
    .reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints){
  return earnPoints >= totalPoints * 0.5; // 50% pass
}

/** check user auth  */
export function CheckUserExist({ children }){
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

/** get server data */
export async function getServerData(url, callback){
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}


/** post server data */
export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}