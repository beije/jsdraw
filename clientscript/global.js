function add_event( obj, type, event, usecapture )
{
	usecapture = ( usecapture ? usecapture : false );
	
	if( obj.addEventListener )
	{
		// For chrome, safari, firefox, opera, internet explorer 9
		obj.addEventListener( type , event , usecapture);
	}
	else
	{
		// For internet explorer 8 and older
		obj.attachEvent('on'+type, event );
	}

	return false;
}