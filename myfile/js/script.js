/**
 * Created by lijinke on 2016/4/11.
 */
function goBack(){
    if(history.length>=1){
        history.back();
    }else{
        location.href="/"
    }
}