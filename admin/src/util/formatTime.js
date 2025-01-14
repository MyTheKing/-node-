/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import moment from 'moment'
moment.locale("zh-cn")  
const formatTime = {
    getTime:(date)=>{
        //
        return moment(date).format('YYYY/MM/DD');
    }
}

export default formatTime