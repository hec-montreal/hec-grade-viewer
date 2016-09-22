package ca.hec.gradeviewer.impl;

import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.gradeviewer.api.GradeViewerService;

public class GradeViewerServiceImpl implements GradeViewerService {

	private UserDirectoryService userDirectoryService = null;
	
	@Override
	public String getUserId(String matricule) {
		try {
			User user = userDirectoryService.getUserByEid(matricule);
			
			if(user == null)
			{
				return "null";
			}
			
			return user.getId();
		} catch (UserNotDefinedException e) {
			return e.getMessage();
		}
	}

	public void setUserDirectoryService(UserDirectoryService userDirectoryService) {
		this.userDirectoryService = userDirectoryService;
	}
}
