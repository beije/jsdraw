/**
 * JsDraw is a small javascript application that can handle some basic drawing
 * by the user. It's a test for learning git.
 *
 * @project        JsDraw
 * @file           drawer.mousehandler.js
 * @description    Handles the mouse event for the application
 * @author         Benjamin Horn
 * @version        1.0.1
 * @link           http://www.beije.fi/post/canvas-drawer/
 * 
 */
(function( Application )
{
	/*
	 * Mousehandler()
	 *
	 */
	Application.mousehandler = new function()
	{
		this.mouseposition = { x:0, y:0 };								// Holds the latest captured mouse positions
		this.drawcoordinates = { from:{ x:0,y:0 }, to:{ x:0, y:0 } };	// The coordinates between the line beg. and end
		this._drawing = false;											// If we're currently drawing something
		this._usefollowdraw = false;									// If we should use follow draw
		this._followdraw = false;										// If followdraw is currently active(?)
						
		/*
		 * function _initialize()
		 *
		 * Initializes the object
		 *
		 */
		this._initialize = function()
		{
			if( !Application.canvas )
			{
				Application._error( 'No canvas set, aborting' );
				return false;
			}
		
			Application.mousecanvas.style.cursor = 'crosshair';
		
			// Bind events to the canvas element
			add_event( Application.mousecanvas, 'mousemove', 
				function( e )
				{ 
					Application.mousehandler._updatemouseposition( e );
				}
			);
			
			add_event( Application.mousecanvas, 'mousedown', 
				function( e )
				{ 
					Application.mousehandler._mousedown( e );
				}
				,false
			);
			
			add_event( Application.mousecanvas, 'mouseup', 
				function( e )
				{ 
					Application.mousehandler._mouseup( e );
				}
				,false
			);			
			
			add_event( Application.mousecanvas, 'mouseout', 
				function( e )
				{ 
					Application.mousehandler._mouseout( e );
				}
				,false
			);
			
		};
		
		/*
		 * Function _mousedown()
		 *
		 * Captures the mousedown event and register
		 * start point for the line
		 *
		 * @param (event) e Window.event
		 *
		 * @return (void)
		 */
		this._mousedown = function( e )
		{
			var e = e || window.event;
			
			this._drawing = true;
			
			if( this._followdraw == false && this._usefollowdraw === true )
			{
				this._followdraw = true;
			}
			
			this.drawcoordinates.from.x = e.layerX;
			this.drawcoordinates.from.y = e.layerY;
		}		
		
		/*
		 * Function _mouseup()
		 *
		 * Captures the mouseup event and register
		 * the end point for the line (or stops drawing if
		 * follow event is true)
		 *
		 * @param (event) e Window.event
		 *
		 * @return (void)
		 */
		this._mouseup = function( e )
		{
			var e = e || window.event;
			
			if( this._drawing === false ) return false;
			this._drawing = false;
			
			this.drawcoordinates.to.x = e.layerX;
			this.drawcoordinates.to.y = e.layerY;
					
			var style = { strokestyle: 'rgba(0,0,0,1)' };
			
			if( this._followdraw == false )
			{
				Application.painter.clearcontext( Application.mousecanvas.getContext('2d') );
				Application.painter.paint( Application.mousehandler.drawcoordinates, style );
			}
			else
			{
				this._followdraw = false;
			}
		}
		
		/*
		 * Function _updatemouseposition()
		 *
		 * Captures the mousemove event and registers
		 * the current mouse position. If follow draw
		 * is true then the application is drawing
		 * continously as the mouse moves.
		 *
		 * @param (event) e Window.event
		 *
		 * @return (void)
		 */
		this._updatemouseposition = function( e )
		{
			var e = e || window.event;
			
			Application.mousehandler.mouseposition.x = e.layerX;
			Application.mousehandler.mouseposition.y = e.layerY;

			if( Application.mousehandler._drawing === true && this._followdraw === false )
			{
				var positions = {};
				positions.from = Application.mousehandler.drawcoordinates.from;
				positions.to = { x:Application.mousehandler.mouseposition.x, y:Application.mousehandler.mouseposition.y };
				
				var style = { strokeStyle: 'rgba(0,0,0,0.3)' };
				
				Application.painter.clearcontext( Application.mousecanvas.getContext('2d') );
				Application.painter.paint( positions, style, Application.mousecanvas.getContext('2d') );
			}
			
			if( Application.mousehandler._drawing === true && this._followdraw === true )
			{
			
				var positions = {};
				positions.from = Application.mousehandler.drawcoordinates.from;
				positions.to = { x:Application.mousehandler.mouseposition.x, y:Application.mousehandler.mouseposition.y };

				Application.painter.paint( positions, {}, Application.canvas.getContext('2d') );
				
				Application.mousehandler.drawcoordinates.from = { x:Application.mousehandler.mouseposition.x, y:Application.mousehandler.mouseposition.y };
			
			}
		}
		
		/*
		 * Function _mouseout()
		 *
		 * Captures the mouseout event and cancels
		 * any current drawing event.
		 *
		 * @param (event) e Window.event
		 *
		 * @return (void)
		 */
		this._mouseout = function( e )
		{
			if( this._drawing === false ) return false;
			if( this._followdraw === true ) this._followdraw = false;
			Application.painter.clearcontext( Application.mousecanvas.getContext('2d') );
			this._drawing = false;
		}
		
		/*
		 * Function toString()
		 *
		 * returns object as string
		 *
		 * @return String
		 */
		this.toString = function()
		{
			return '[object DrawerMouseHandler]';
		}
		
		/*
		 * Function togglefollowdraw()
		 *
		 * Toggles the follow draw
		 *
		 * @return (boolean) current status of follow draw
		 */
		this.togglefollowdraw = function()
		{
			if( this._usefollowdraw === false )
			{
				this._usefollowdraw = true;
				return true;
			}
			
			this._usefollowdraw = false;
			return false;
		}
	}

})( Drawer );
