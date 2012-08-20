add_event( 
	getbyid( 'style1' ), 
	'click', 
	function()
	{
		Drawer.setstyle( { strokeStyle:'rgba(0,0,0,1)', lineWidth:2 } );
	}
);
add_event( 
	getbyid( 'style2' ), 
	'click', 
	function()
	{
		Drawer.setstyle( { strokeStyle:'rgba(255,255,0,1)', lineWidth:4 } );
	}
);
add_event( 
	getbyid( 'style3' ), 
	'click', 
	function()
	{
		Drawer.setstyle( { strokeStyle:'rgba(255,0,255,1)', lineWidth:5 } );
	}
);
add_event( 
	getbyid( 'style4' ), 
	'click', 
	function()
	{
		Drawer.setstyle( { strokeStyle:'rgba(0,255,0,1)', lineWidth:1 } );
	}
);
add_event( 
	getbyid( 'style5' ), 
	'click', 
	function()
	{
		Drawer.setstyle( { strokeStyle:'rgba(255,255,255,1)', lineWidth:5 } );
	}
);
add_event( 
	getbyid( 'free' ), 
	'click', 
	function()
	{
		Drawer.mousehandler.togglefollowdraw();
	}
);