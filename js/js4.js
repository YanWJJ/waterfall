window.onload = function(){
	img_location("#container", ".box");
	var img_data = {
		"data" : {
			        "data": [{
            "src": "01.jpg"
        }, {
            "src": "02.jpg"
        }, {
            "src": "03.jpg"
        }, {
            "src": "04.jpg"
        }, {
            "src": "05.jpg"
        }, {
            "src": "06.jpg"
        }, {
            "src": "07.jpg"
        }, {
            "src": "08.jpg"
        }, {
            "src": "09.jpg"
        }, {
            "src": "10.jpg"
        }, {
            "src": "11.jpg"
        }, {
            "src": "12.jpg"
        }, {
            "src": "13.jpg"
        }, {
            "src": "14.jpg"
        }]
		}
	}
	window.onscroll = function(){
		if (check_scroll("#container", ".box")) {
			load_newimgs(img_data);
		}
	}
}

function img_location(parent, content){
	var dparent = document.querySelector(parent);
	var dcontent = document.querySelectorAll(content);
	// console.log(dcontent);
	var dec_width = get_width(dparent, dcontent);
	var image_location = min_image_location(dec_width, dcontent);
}
function get_width(dparent, dcontent){
	var img_width = dcontent[0].offsetWidth;
	var win_width = document.documentElement.clientWidth;
	var num_width = Math.floor(win_width /  img_width);
	// var num_width = win_width /  img_width;
	//设置父级的宽度就定义了一排的宽度；"px"特别注意
	dparent.style.width = img_width * num_width + "px";
	dparent.style.margin = " 0 auto";
	return num_width;
}

function min_image_location(dec_width, dcontent){
	var box_height_array = [];
	for(var i=0; i<dcontent.length; i++){
		if( i < dec_width ){
			box_height_array[i] = dcontent[i].offsetHeight;
		} else {
			var min_height = Math.min.apply(null, box_height_array);
			var min_index = get_min_index(min_height, box_height_array);
			dcontent[i].style.position = "absolute";
			dcontent[i].style.top = min_height + "px";
			dcontent[i].style.left = dcontent[min_index].offsetLeft + "px";
			box_height_array[min_index] = box_height_array[min_index] + dcontent[i].offsetHeight; //最小图片的高度加上在他后面图片的高度
		}//相当于只有列数一定的照片的高度，将后面的高度都累加上去了
	}
}
function get_min_index(min_height, box_height_array) {
    for (var i in box_height_array) {
        if (box_height_array[i] == min_height) { //循环所有数组的高度 让它等于最小图片的高度 返回i值
            return i;
        }
    }
}


// $(function(){
// 	var arr = ["01", "02", "03", "04", "05"];
// 	var content = null;
// 	$(window).scroll(function(){
// 		if($(window).height() - $(this).scrollTop() - $(this).height()< 100){
// 		console.log("sfa");
// 		for(var i in arr ){
// 		 content = content + "<div class='box'>"+
//     		  "<div class='box_img'>"+
//               "<img src='images/"+arr[i]+".jpg'>"+
//     		  "</div>"+
// 			  "</div>";					
// 		}
// 		document.querySelector("#container").innerHTML += content;
// 		img_location("#container", ".box");			
// 		}

// 	})
// })
function check_scroll(parent, content){
	var dparent = document.querySelector(parent);
	var dcontent = document.querySelectorAll(content);
	var last_content_height = dcontent[dcontent.length - 1].offsetTop;
    var scroll_top = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条到顶的距离
    var page_height = document.documentElement.clientHeight || document.body.clientHeight; //获取屏幕高度
    // console.log(scroll_top)
    if (last_content_height < scroll_top + page_height) {
        return true;
    }
}

function load_newimgs(obj){
	// console.log(obj.data.data[0].src);
	for(var i in obj.data.data){
		var content = content + "<div class='box'>"+
    		  "<div class='box_img'>"+
              "<img src='images/" + obj.data.data[i].src + "'>"+
    		  "</div>"+
			  "</div>";					
		}
		document.querySelector("#container").innerHTML += content;
		img_location("#container", ".box");			
	}
