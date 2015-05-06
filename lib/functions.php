<?php
/**
 * 判斷是否為微軟環境
 *
 * @return boolean
 */
function is_window(){
	if (substr(php_uname(), 0, 7) == "Windows"){
		return true;
	}else {
		return false;
	}
}
/**
 * windows/linux環境 開關adls指令
 * linux要預先設定好 # /usr/sbin/adsl-setup  執行連線(輸入一連串問題)
 *
 * @param boolean $conn
 */
function adsl_cmd($conn=true){
	$results = '';
	if ($conn === true) {
		//$results = win_exec('cmd.exe /c Rasdial "'.ADSL_NAME.' 72983396@hinet.net vmbanmrn"');
		if (is_window()) {
			$results = exec('Rasdial '.ADSL_NAME.' '.ADSL_ACCOUNT.' '. ADSL_PWS);
		}else {
			$results = exec('/sbin/ifup ppp0');
		}
		
	}else {
		if (is_window()) {
			$results = exec('Rasdial "'.ADSL_NAME.'" /disconnect');
		}else {
			$results = exec('/sbin/ifdown ppp0');
		}
	}
	return $results;
}
/**
 * Recursively delete a directory 遞迴刪除檔案
 *
 * @param string $dir Directory name
 * @param boolean $deleteRootToo Delete specified top-level directory as well 本欄位為真 則一併刪除母目錄
 */
function unlinkRecursive($dir, $deleteRootToo)
{
    if(!$dh = @opendir($dir))
    {
        return;
    }
    while (false !== ($obj = readdir($dh)))
    {
        if($obj == '.' || $obj == '..')
        {
            continue;
        }

        if (!unlink($dir . '/' . $obj))
        {
            unlinkRecursive($dir.'/'.$obj, true);
        }
    }

    closedir($dh);
   
    if ($deleteRootToo)
    {
        @rmdir($dir);
    }
   
    return;
}
    /**
     * 將連結轉換成絕對網址
     *
     * @param string $base 網址目錄
     * @param string $href 網頁連結
     * @return string 絕對網址
     */
    function resolve_href ($base, $href) {
     
    // href="" ==> current url.
    if (!$href) {
        return false;
    }

    // href="http://..." ==> href isn't relative
    $rel_parsed = parse_url($href);
    if (array_key_exists('scheme', $rel_parsed)) {
        return false;
    }

    // add an extra character so that, if it ends in a /, we don't lose the last piece.
    $base_parsed = parse_url("$base ");
    // if it's just server.com and no path, then put a / there.
    if (!array_key_exists('path', $base_parsed)) {
        $base_parsed = parse_url("$base/ ");
    }

    // href="/ ==> throw away current path.
    if ($href{0} === "/") {
        $path = $href;
    } else {
        $path = dirname($base_parsed['path']) . "/$href";
    }

    // bla/./bloo ==> bla/bloo
    $path = preg_replace('~/\./~', '/', $path);

    // resolve /../
    // loop through all the parts, popping whenever there's a .., pushing otherwise.
        $parts = array();
        foreach (
            explode('/', preg_replace('~/+~', '/', $path)) as $part
        ) if ($part === "..") {
            array_pop($parts);
        } elseif ($part!="") {
            $parts[] = $part;
        }

	    return (
	        (array_key_exists('scheme', $base_parsed)) ?
	            $base_parsed['scheme'] . '://' . $base_parsed['host'] : ""
	    ) . "/" . implode("/", $parts);
	}
	
	/**
	 * Enter description here...
	 *
	 * @param array $data
	 * @param string $site_url
	 * $params string $keywords
	 * @param PDO $dbo
	 */
	function save_site_seo_info($data,$site_url,$keywords,$dbo){
		
	}
	/**
	 * 解析字串中所有網址 以陣列輸出
	 *
	 * @param string $txt
	 * @return array|false
	 */
	function analytic_domain($txt){
		if (false !== preg_match_all('#\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b#i',$txt,$mt)) {
			return array_unique($mt[0]);
		}else {
			return false;
		}				
	}
	/**
	 * 解析字串中所有電郵 以陣列輸出
	 *
	 * @param string $txt
	 * @return array|false
	 */
	function analytic_email($txt){
		if (false !== preg_match_all('#\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b#i',$txt,$mt)) {
			return array_unique($mt[0]);
		}else {
			return false;
		}				
	}	
	/**
	 * 解析google cache頁的日期 like:26 Dec 2009 07:17:26 GMT
	 * @author 董林北
	 * @param string $txt
	 * @return string|false
	 */
	function analytic_google_cache_date($txt){
		if (false != preg_match('#([1-9]|[12][0-9]|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Apr|Sep|Oct|Nov|Dec) (19|20)[0-9]{2} ([0-9]){2}:([0-9]){2}:([0-9]){2} gmt#i',$txt,$mt)) {
			return $mt[0];
		}else {
			return false;
		}
	}
	function analytic_meta_keywords($keytxt){
		if (empty($keytxt)) {
			return false;
		}else {
			$keys = explode(',',$keytxt);
			$keys = array_map('trim', $keys);
			//array_walk($keys,'trim');
			return $keys;
		}
	}
	/**
	 * 檢查網域名稱 並規避之
	 *
	 * @param unknown_type $url
	 * @return unknown
	 */
	function check_domain($url){
		$chks = array(
		'cens.com',
		'alibaba.com',
		'taiwantrade.com.tw',
		'globalsources.com',
		'allproducts.com'
		);
		$result = true;
		foreach ($chks as $chk){
			if (strstr($url,$chk)!==false) {
				return false;
			}
		}
		return $result;
	} 
	/**
	 * A function like strip_tags, only it removes only the tags (with attributes) specified
	 *
	 * @param string $str
	 * @param array|string $tags array('p', 'h1')|'<p><h1>'
	 * @return string
	 */
	function strip_only($str, $tags) {
	    if(!is_array($tags)) {
	        $tags = (strpos($str, '>') !== false ? explode('>', str_replace('<', '', $tags)) : array($tags));
	        if(end($tags) == '') array_pop($tags);
	    }
	    foreach($tags as $tag) $str = preg_replace('#</?'.$tag.'[^>]*>#is', '', $str);
	    return $str;
	}	
	function string2int($str){
		$find = '#([^0-9])#i';
		$rep = '';
		return preg_replace($find,$rep,$str);
	}
	/**
	 * Enter description here...
	 *
	 * @param string $url
	 * @param PDO_DB $dbo
	 * @param string $cid
	 */
	function checkSiteToSave($dect_url,$dbo,$cid=false){	
		$table = 'site_seo_info';	
		$sql = "SELECT is_analytic FROM {$table} WHERE id=".$dbo->quote(md5($dect_url));		
		echo $sql,"\n";
		$stt = $dbo->query($sql);	
		//var_dump($stt);	
		if ($stt->fetch()) {
			$row = $stt->fetch();
			if ($row['is_analytic'] == 'FALSE') {
				return false;
			}else {
				return true;
			}
			//return $row['is_analytic'];		
		}else{
			unset($stt,$sql);
			$data = array(
			'id' => md5($dect_url),
			'url' => $dect_url,
			);
			if ($cid != false) {
				$data['c_id'] = $cid;
			}
			$sql = $dbo->genReplaceSQL($table,$data);
			echo $sql."\n";
			$dbo->exec($sql);
			return false;
		}
	}	
	function gmail($f,$t,$p,$title,$body,$fn='環球暢貨',$is_html=false){
		$mail = new PHPMailer();
		$mail->IsSMTP(); // set mailer to use SMTP
		$mail->CharSet = 'utf-8';
		$mail->Encoding = 'base64';
		$mail->From = $f;
		$mail->FromName = $fn;
		$mail->Host ='ssl://smtp.gmail.com';
		$mail->Port = 465; //default is 25, gmail is 465 or 587
		$mail->SMTPAuth = true;
		$mail->Username = $f;
		$mail->Password = $p;
		$mail->AddAddress($t);
		$mail->ConfirmReadingTo = $f;
		$mail->WordWrap = 50;
		
		$mail->IsHTML($is_html);
		$mail->Subject = $title;
		$mail->Body = $body;		
		
		if(!$mail->Send())
		{
			echo "通知信件寄出失敗";
			return false;
		}else {
			return true;
		}	
	}
function get_include_contents($filename,$vars = array()) {
	extract($vars, EXTR_OVERWRITE);
    if (is_file($filename)) {
        ob_start();
        include $filename;
        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }
    return false;
}	
function newIEtoForeground($title,$url,$evtPrefix="") {
    // brings new instance of IE to foreground with title $title
    if (!$extPrefix) $ie = new COM("InternetExplorer.Application");
    else $ie = new COM("InternetExplorer.Application", $evtPrefix);
    $ie->Navigate2("about:blank");
    $oWSH = new COM("WScript.Shell");
    while ($ie->ReadyState!=4) usleep(10000);

    $ie->Document->Title = ($tmpTitle = mt_rand());  //unique title
    $ie->Visible = true;
    while (!$oWSH->AppActivate("$tmpTitle - M")) usleep(10000);

    $ie->Document->Title = $title;
    //$ie->Navigate($url);
    $ie->Document->ParentWindow->opener="me";  // allows self.close()
    return $ie;
}
function strstrb($h,$n){
    return array_shift(explode($n,$h,2));
}
?>