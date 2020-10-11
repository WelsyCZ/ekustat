// FUNKCE
function showAll(){
    tabs.forEach(element => element.parentElement.setAttribute("style", "display: block"));
}

function hideAll(){
    tabs.forEach(element => element.parentElement.setAttribute("style", "display: none"));
}

function show(tab){
    tab.parentElement.setAttribute("style", "display: block");
}

function hide(tab){
    tab.parentElement.setAttribute("style", "display: none");
}

function createCell(cell, text, bold=0){
    var txt = document.createTextNode(text);
    if(bold == 0){
        cell.appendChild(txt);
    } else {
        var b = document.createElement("b");
        b.appendChild(txt);
        cell.appendChild(b);
    }
    cell.setAttribute("style", "text-align: center");
}

function getKills(t){
    var CB = Array(t.rows.length);
    for(var i = 0; i < CB.length; ++i){
        try{
            CB[i] = t.rows[i].cells[5].textContent;
            } catch(err){}
    }
    var kills = Array(t.rows.length);
    for(var i = 0; i < kills.length; ++i){
        if(CB[i] == "0"){
            kills[i] = String(0);
        } else{
            try{
                kills[i] = String(parseInt(CB[i], 10) / 8);
            } catch (err){}
        }
    }
    return kills;
}

function getDeaths(t){
    var CB = Array(t.rows.length);
    for(var i = 0; i < CB.length; ++i){
        try{
            CB[i] = t.rows[i].cells[5].textContent;
            } catch(err){}
    }
    var KDs = Array(t.rows.length);
    for(var i = 0; i < CB.length; ++i){
        try{
            KDs[i] = t.rows[i].cells[8].textContent;
            } catch(err){}
    }
    var deaths = Array(t.rows.length);
    for(var i = 0; i < deaths.length; ++i){
        if(CB[i] == "0"){
            deaths[i] = " - ";
            continue;
        } else {
            try{
                var ccb = parseInt(CB[i], 10)/8;
                var kkd = parseFloat(KDs[i]);
                var ds = Math.round(ccb/kkd)
                deaths[i] = String(ds);
            } catch (err){
                console.log(err);
            }
        }
    }
    return deaths;
}

function writeCol(t, colID, ar){
    var c = 0;
    for(r of t.rows){
        try{
            if(r.rowIndex == 0){ c++; continue;}
            r.cells[colID].textContent = ar[c++];
        } catch (err){}
    }
}

function addCells(t){
    for(e of t.rows){
        try{
            var bold = e.rowIndex == 0 ? 1 : 0;
            var text = e.rowIndex == 0 ? "Zabití" : " - ";
            createCell(e.insertCell(6), text, bold);
            var text = e.rowIndex == 0 ? "Smrti" : " - ";
            createCell(e.insertCell(7), text, bold);
        } catch (err){}
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var ck = getCookie(cname);
        if (ck != "") {
            return true;
        } else {
            return false;
        }
}

function run(){
    var idname = "ekustatscript12";
    // MAIN
    if(document.getElementById(idname) == null){

        var tab1 = document.getElementById("in1").getElementsByTagName("table")[0];
        var tab2 = document.getElementById("in2").getElementsByTagName("table")[0];
        var tab3 = document.getElementById("in3").getElementsByTagName("table")[0];
        var tabs = [tab1, tab2, tab3];
        tabs.forEach(e => addCells(e));
        tabs.forEach(e => writeCol(e, 6, getKills(e)));
        tabs.forEach(e => writeCol(e, 7, getDeaths(e)));
        var html = document.getElementsByTagName("html")[0];
        var span = document.createElement("span");
        span.setAttribute("id", idname);
        html.appendChild(span);
    }
}
