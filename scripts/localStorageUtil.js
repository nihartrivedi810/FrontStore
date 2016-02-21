function localStorageGet(name)
{
	if(localStorage[name])
	{
		return localStorage[name];
	}
	else
	{
		return false;
	}
};

function localStorageSet(name,value)
{
	localStorage[name]=value;
};
