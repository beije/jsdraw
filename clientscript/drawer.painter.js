(function( Application )
{
	Application.painter = new function()
	{
		this.context = null;
		this._currentstyle = 
		{
			strokeStyle: 'rgba(0,0,255,1)',
			lineWidth: 3
		};
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
		
		this.setstyle = function( styleobj )
		{
			for( var i in this._currentstyle )
			{
				this._currentstyle[i] = ( styleobj[i] ? styleobj[i] : this._currentstyle[i] );
			}
		}
		
		this.clearcontext = function( ctx )
		{
			if( !ctx ) this.context;
			
			// TODO, fix height width
			ctx.clearRect ( 0 , 0 , 1000 , 1000 );
		}
		
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
		
		this.toString = function()
		{
			return '[object DrawerPainter]';
		}
	
	}

})( Drawer );
