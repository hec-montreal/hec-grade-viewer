package ca.hec.gradeviewer.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	final static DateFormat DATE_FORMAT = new SimpleDateFormat("YYYY-MM-dd");

	public static String formatDate(Date date) {
		if (date == null) {
			return "";
		}

		return DATE_FORMAT.format(date);
	}
}
