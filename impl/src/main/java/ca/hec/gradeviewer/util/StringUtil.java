package ca.hec.gradeviewer.util;

public class StringUtil {

	public static String valOrEmptyString(String s) {
		if (s == null) {
			return "";
		}

		return s;
	}
}
