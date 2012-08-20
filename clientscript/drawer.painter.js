/**
 * JsDraw is a small javascript application that can handle some basic drawing
 * by the user. It's a test for learning git.
 *
 * @project        JsDraw
 * @file           drawer.painter.js
 * @description    Paints to the canvas element
 * @author         Benjamin Horn
 * @version        1.0.1
 * @link           http://www.beije.fi/post/canvas-drawer/
 * 
 */
(function( Application )
{
	Application.painter = new function()
	{
		this.context = null;					// The canvas context
		this._currentstyle = 					// Current style directives
		{
			strokeStyle: 'rgba(0,0,255,1)',
			lineWidth: 3
		};

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
			if( !Application.canvas.getContext('2d') )
			{
				Application._error( 'No support for canvas drawing.' );
				return false;
			}
			
			this.context = Application.canvas.getContext("2d");
			
		};

		/*
		 * Function setstyle()
		 *
		 * Applies new style directives for the painter.
		 *
		 * @param (object) styleobj Object containing the new style directives
		 *
		 * @return (void)
		 */
		 		
		this.setstyle = function( styleobj )
		{
			for( var i in this._currentstyle )
			{
				this._currentstyle[i] = ( styleobj[i] ? styleobj[i] : this._currentstyle[i] );
			}
		}
		
		/*
		 * Function clearcontext()
		 *
		 * Clears out a context from previous
		 * data.
		 *
		 * @param (object) ctx Canvas context
		 *
		 * @return (void)
		 */
		 
		this.clearcontext = function( ctx )
		{
			if( !ctx ) this.context;
			
			// TODO, fix height width
			ctx.clearRect ( 0 , 0 , 1000 , 1000 );
		}
		
		/*
		 * Function paint()
		 *
		 * Does the actual painting on the canvas
		 *
		 * @param (object) positions 	Positions for the new line
		 * @param (object) style		Style directives
		 * @param (object) ctx			In what context should be painted
		 *
		 * @return (void)
		 */
		this.paint = function( positions, style, ctx )
		{
			var ctx = ( !ctx ? this.context : ctx );
			
			for( var i in this._currentstyle )
			{
				ctx[i] = ( style[i] ? style[i] : this._currentstyle[i] );
			}

			ctx.beginPath();
			ctx.moveTo( positions.from.x, positions.from.y );
			ctx.lineTo( positions.to.x, positions.to.y );
			ctx.stroke();
		}
		
		/*
		 * Function toString()
		 *
		 * Returns object as string
		 *
		 * @return (String)
		 */
		this.toString = function()
		{
			return '[object DrawerPainter]';
		}
	
	}

})( Drawer );
