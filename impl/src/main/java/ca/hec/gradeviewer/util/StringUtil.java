package ca.hec.gradeviewer.util;

import java.text.DecimalFormat;

public class StringUtil {

	public static String valOrEmptyString(String s) {
		if (s == null) {
			return "";
		}

		return s;
	}

	public static String formatGrade(Double grade) {
		if (grade == null) {
			return "";
		}

		String ret = new DecimalFormat("#0.00").format(grade);

		return ret.replaceAll(",", ".");
	}

	public static Double parseGrade(String grade) {
		if (grade == null) {
			return null;
		}

		grade = grade.replaceAll(",", ".");

		try {
			return Double.parseDouble(grade);
		} catch (NumberFormatException e) {
			return null;
		}
	}
}
