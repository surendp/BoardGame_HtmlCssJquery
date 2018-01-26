
$(function(){
	
	// p1 = player 1
	// p2 = player 2
	
	// defining the arrays for players
	var p1_array = [0, 0, 0, 0, 0, 0];
	var p2_array = [0, 0, 0, 0, 0, 0];
	
	var p1 = "p1";
	var p2 = "p2";
	
	// hiding the guide lines
	$('#guidelines').hide();
			
 	$('.play').click(function() {
		// changing the html page
		window.location = 'board_game.html';		

	});
	
	// Showing Rules from How to Play button
	$('#how_to_play').click(function() {
		$('#first_page').hide();
		$('#guidelines').show();
	});
	
	// Going back to Home page 
	$('#home').click(function() {
		$('#guidelines').hide();
		$('#first_page').show();
	});
	
	// making the board ready
	fill_board("#"+p1, "#"+p2, "#center", p1_array, p2_array);
		
	// reversing the array of player 2
	p2_array.reverse();
		
	// refreshing the board
	refresh(p1, p2, p1_array, p2_array);
	
	$("img").click( function(){
		var parent_id = $(this).parent().attr("id");
			
		// updating the game status in the backgroung arrays
		update_board(parent_id, p1_array, p2_array);
			
		// updating the front end 
		refresh(p1, p2, p1_array, p2_array);
			
		// checking and displaying the game over layout
		game_over(p1_array, p2_array)
	});
	
	
	// All the functions are below
	

	// updating functions
	function update_board(sub_div_id, p1_array, p2_array ){
		
		var current_div = sub_div_id.substr(0,2);
		var index = parseInt(sub_div_id.substr(2,sub_div_id.length-1));
		var last_iterated_div = "";
		
		var array_new = capture_array(current_div, index, p1_array, p2_array);
		var array = array_new;
		
		var card = array[index];
		
		// increase the index by 1 because update function starts the 
		// increament in value starting from the supplied index
		new_index = index+1;
		
		for(;;){		
			
			if(card <= 0){
				break;
			}
			

			// function return array and the index from where to start
			array= capture_array(current_div, index, p1_array, p2_array);

			if(last_iterated_div == ""){
				
				if(current_div == "p1"){
					// change the last_iterated_div to current div
					last_iterated_div = "p1";
					current_div = "p2"; 					
				}else{
					// change the last_iterated_div to current div
					last_iterated_div = "p2";
					current_div = "p1";
				}				

				// update the player
				card = update_player(array, new_index, card);
				card --;
				// change the selected image to 0
				array[index] = 0;
				
				// change the index to zero for next iteration
				new_index = 0;
				console.log(current_div);
			}
			else{
				
				if(current_div == "p1"){
					// change the last_iterated_div to current div
					last_iterated_div = "p1";
					current_div = "p2";
				}else{
					// change the last_iterated_div to current div
					last_iterated_div = "p2";
					current_div = "p1";
				}
				
				// update the player
				card = update_player(array, new_index, card);
				card--;
				
				// change the index to zero for next iteration
				new_index = 0;
				console.log(current_div);
			}
		}		
		
	}
	
	// function to Capture the array for iteration
	function capture_array(current_div, index, p1_array, p2_array){
		
		var array_return = p1_array;
		
			if(current_div == "p1"){
				array_return = p1_array;
				//array_return[1] = index;
				 
			}else{
				array_return = p2_array;
				//array_return[1] = index;
			}
			
		return array_return;
	}
	
	// This function increases the value of each index of the array by 1 starting from the given index
	// unless the card value turns out to be 0
	// Returns the remaining value in the card
	function update_player(p_array, start_index, card){
		for(var i = start_index; i < p_array.length; i++){
			if(card > 0){
				card --;
				p_array[i] += 1;
			}else{
				break;
			}
		}		
		return card;
	}
	
	// refreshing functions
	
	// refresh board
	function refresh(p1, p2, p1_array, p2_array){
		
		// refresh player 1
		refresh_row(p1, p1_array);
		
		// refresh player 2
		refresh_row(p2, p2_array);
	}
	
	// refresh single row
	function refresh_row(row_id, array){
		for(var i = 0; i < array.length; i++){
			var div_id = row_id + i;
			$("#"+div_id+" img").attr("src", "images/"+array[i]+".jpg");
		}
	}
	
	
	// Initializing functions
	
	// function to append a single div in a row
		function append_div(parent_id ,id, cls){
			// define the div element
			var div = "<div></div>";
			
			// append div to the parent_id
			$(div).appendTo(parent_id);
			
			// add attribute to the div
			$(parent_id+" div:last-child").attr({"id":id, "class":cls});
		}
		 


		// function to insert an image in the given element
		function insert_image(id, source){
			var card = "<img src = '' alt = 'card'/>";
			
			// append to the given id
			$(card).appendTo("#"+id);			
			
			// putting the source to the image
			$("#" + id + " img").attr({"src": source, "class":"img-responsive new"});

		}


		// fill the row with given number of divs
		function fill_row_array_p2(parent_div, n, array){
			var col = Math.floor(12/n);
			var class_name = "col-xs-"+col;
			
			for(var i = 0; i < n; i++){
				var current_div = parent_div.substr(1,parent_div.length-1) + i;
				var img_sorce = "images/" + (i+1) + ".jpg";
				
				// using predefined function to append a div 
				append_div(parent_div, current_div, class_name);
				
				// using predefined funciton to insert image
				insert_image(current_div, img_sorce);
				
				// fill the array with the card number
				array[i] = (i+1);

			}
			
			
		}
		
				// fill the row with given number of divs
		function fill_row_array_p1(parent_div, n, array){
			var col = Math.floor(12/n);
			var class_name = "col-xs-"+col;
			
			for(var i = (n-1); i >= 0; i--){
				var current_div = parent_div.substr(1,parent_div.length-1) + i;
				var img_sorce =  "images/" + (i+1) + ".jpg";
				
				// using predefined function to append a div 
				append_div(parent_div, current_div, class_name);
				
				// using predefined funciton to insert image
				insert_image(current_div, img_sorce);
				
				// fill the array with the card number
				array[i] = (i+1);
			}
			array.reverse();
		}
		
		// function to fill the middle row
		function fill_middle(parent_div,n){
			
			var array = [0,0,0,0,0,0];
			
			fill_row_array_p2(parent_div, n, array);
			
			for(var i = 0; i < n; i++){				
				var current_div = parent_div + i;
				
				if(i == 0 || i == (n-1)){					
					$(current_div + " img").attr("src" , "images/ring.png");
				}
				else{
					$(current_div + " img").attr("src" , "images/middle.jpg");
				}
			}
				
		}

		// function to fill the board
		function fill_board(p1_id, p2_id, center_id, p1_array, p2_array){
			
			cols = 6;
			
			// fill player 1
			fill_row_array_p1(p1_id, cols, p1_array);
			
			// fill center 
			fill_middle(center_id, cols);
			
			// fill player2
			fill_row_array_p2(p2_id, cols, p2_array);
		}
		
		//Function to end the game
		// check game status
		function game_over(p1_array, p2_array){
			var sum_p1 = get_sum(p1_array);
			var sum_p2 = get_sum(p2_array);
			
			if(sum_p1 == 0 || sum_p2 == 0){
				$("#board").hide();
				if(sum_p1 == 0){
					$("#end").html("<h1>Game Over!!!</br>Player 1 Wins</h1>");
				}
				else{
					$("#end").html("<h1>Game Over!!!</br>Player 2 Wins</h1>");
				}
				
			}
		}
		
		// function to get the sum of the values in the array
		function get_sum(array){
			var sum = 0;
			for(var i = 0; i < array.length; i++){
				sum += array[i];
			}
			return sum;
		}
	
});
