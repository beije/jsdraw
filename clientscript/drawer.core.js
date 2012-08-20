(function( Application )
{
	Application.mousecanvas = null;
	Application.canvas = null;
	Application.mousehandler = null;

	Application._initialize = function()
	{
		if( !document.getElementById( 'pagecanvas' ) )
		{
			this._error( 'No canvas detected, aborting.' );
			return false;
		}
	
		this.canvas = document.getElementById( 'pagecanvas' );
		
		this._initializemousecanvas();
		
		this.mousehandler._initialize();
		
		this.painter._initialize();
	}
	
	Application._initializemousecanvas = function()
	{
		if( this.canvas.style.position == '' ) this.canvas.style.position = 'relative';
		
		this.mousecanvas = this.canvas.cloneNode( false );
		this.mousecanvas.id = 'Drawer-mouse-painter';
		this.mousecanvas.style.position = 'absolute';
		this.mousecanvas.style.top = this.canvas.offsetTop + 'px';
		this.mousecanvas.style.left = this.canvas.offsetLeft + 'px';

		this.canvas.parentNode.insertBefore( this.mousecanvas, this.canvas.nextSibling );
		
	}
	
	Application.togglefollowdraw = function()
	{
		this.mousehandler.togglefollowdraw();
	}
	
	Application.setstyle = function( styleobj )
	{
		this.painter.setstyle( styleobj );
	}
	
	Application._error = function( errormsg )
	{
		if( console && console.error )
		{
			console.error( errormsg );
		}
		else
		{
			throw new error( errormsg );
		}
		
		return false;
	}

	Application.toString = function()
	{
		return '[object DrawerCore]';
	}
	
	
	add_event( window, 'load', 
		function()
		{ 
			Drawer._initialize();
		} 
	);
	
})( Drawer );
