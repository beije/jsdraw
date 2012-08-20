/**
 * JsDraw is a small javascript application that can handle some basic drawing
 * by the user. It's a test for learning git.
 *
 * @project        JsDraw
 * @file           drawer.core.js
 * @description    Core initializer, initialzes the other parts of the drawer
 * @author         Benjamin Horn
 * @version        1.0.1
 * @link           http://www.beije.fi/post/canvas-drawer/
 * 
 */
(function( Application )
{
	Application.mousecanvas = null;			// Mousecanvas, the canvas layer that is above the drawing, shows a preview
	Application.canvas = null;				// Main canvas, aka the drawing
	Application.mousehandler = null;		// Mousehandler object
		 
	/*
	 * function _initialize()
	 *
	 * Initializes the object
	 *
	 */
	Application._initialize = function()
	{
		if( !document.getElementById( 'pagecanvas' ) )
		{
			this._error( 'No canvas detected, aborting.' );
			return false;
		}
	
		this.canvas = document.getElementById( 'pagecanvas' );
		
		// Initialize child objects
		this._initializemousecanvas();
		
		this.mousehandler._initialize();
		
		this.painter._initialize();
	}
	
	/*
	 * Function _initializemousecanvas()
	 *
	 * Creates a new cloned canvas that is 
	 * appended after the real canvas. The new
	 * canvas shows previews of new lines
	 *
	 * @return (void)
	 */
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
	
	/*
	 * Function togglefollowdraw()
	 *
	 * Just calls the mousehandlers function
	 * with same name
	 *
	 * @return (void)
	 */
	Application.togglefollowdraw = function()
	{
		this.mousehandler.togglefollowdraw();
	}
	
	/*
	 * Function setstyle()
	 *
	 * Just sets the new style for the
	 * painter.
	 *
	 * @param (obejct) styleobj Object that contains new style directives
	 *
	 * @return (void)
	 */	
	Application.setstyle = function( styleobj )
	{
		this.painter.setstyle( styleobj );
	}
	
	/*
	 * Function _error()
	 *
	 * Small error handler, mostly for debugging
	 *
	 * @param (String) errormsg	The error message 
	 *
	 * @return (Boolean) false
	 */
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

	/*
	 * Function toString()
	 *
	 * Returns object as string
	 *
	 * @return (String)
	 */
	Application.toString = function()
	{
		return '[object DrawerCore]';
	}
	
	// On window.load initialize the drawer
	add_event( window, 'load', 
		function()
		{ 
			Drawer._initialize();
		} 
	);
	
})( Drawer );
