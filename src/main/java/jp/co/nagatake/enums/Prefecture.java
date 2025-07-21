package jp.co.nagatake.enums;

/*
 * 都道府県のenum定義
 */
public enum Prefecture {
	//都道府県一覧
	HOKKAIDO("北海道"),
	AOMORI("青森県"),
	AKITA("秋田県"),
	IWATE("岩手県"),
	YAMAGATA("山形県"),
	MIYAGI("宮城県"),
	NIIGATA("新潟県"),
	FUKUSHIMA("福島県"),
	GUNMA("群馬県"),
	TOCHIGI("栃木県"),
	IBARAGI("茨城県"),
	CHIBA("千葉県"),
	TOKYO("東京都"),
	SAITAMA("埼玉県"),
	KANAGAWA("神奈川県"),
	YAMANASHI("山梨県"),
	NAGANO("長野県"),
	SHIZUOKA("静岡県"),
	TOYAMA("富山県"),
	ISHIKAWA("石川県"),
	FUKUI("福井県"),
	GIFU("岐阜県"),
	AICHI("愛知県"),
	KYOTO("京都府"),
	SHIGA("滋賀県"),
	MIE("三重県"),
	NARA("奈良県"),
	WAKAYAMA("和歌山県"),
	OSAKA("大阪府"),
	HYOGO("兵庫県"),
	TOTTORI("鳥取県"),
	OKAYAMA("岡山県"),
	SHIMANE("島根県"),
	HIROSHIMA("広島県"),
	YAMAGUCHI("山口県"),
	KAGAWA("香川県"),
	TOKUSHIMA("徳島県"),
	EHIME("愛媛県"),
	KOCHI("高知県"),
	FUKUOKA("福岡県"),
	SAGA("佐賀県"),
	NAGASAKI("長崎県"),
	OITA("大分県"),
	KUMAMOTO("熊本県"),
	MIYAZAKI("宮崎県"),
	KAGOSHIMA("鹿児島県"),
	OKINAWA("沖縄県");
	
	private final String displayName;
	
	//コンストラクタ
	Prefecture(String displayName) {
		this.displayName = displayName;
	}
	
	//ゲッター
	public String getDisplayName() {
		return displayName;
	}

}
