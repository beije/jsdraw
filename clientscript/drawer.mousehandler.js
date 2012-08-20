(function( Application )
{
	Application.mousehandler = new function()
	{
		this.mouseposition = { x:0, y:0 };
		this.drawcoordinates = { from:{ x:0,y:0 }, to:{ x:0, y:0 } };
		this._drawing = false;
		this._usefollowdraw = false;
		this._followdraw = false;
		
		this._initialize = function()
		{
			if( !Application.canvas )
			{
				Application._error( 'No canvas set, aborting' );
				return false;
			}
		
			Application.mousecanvas.style.cursor = 'crosshair';
		
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
		
		this._mouseout = function( e )
		{
			if( this._drawing === false ) return false;
			if( this._followdraw === true ) this._followdraw = false;
			Application.painter.clearcontext( Application.mousecanvas.getContext('2d') );
			this._drawing = false;
		}
		
		this.toString = function()
		{
			return '[object DrawerMouseHandler]';
		}
		
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

		this.lol = function(){};
	}

})( Drawer );
