package ca.hec.gradeviewer.impl;

import java.util.List;

import org.sakaiproject.service.gradebook.shared.GradebookService;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.gradeviewer.api.GradeViewerService;

public class GradeViewerServiceImpl implements GradeViewerService {

	private UserDirectoryService userDirectoryService = null;

	private SiteService siteService = null;

	private GradebookService gradebookService = null;

	@Override
	public User getUserByMatricule(String matricule) throws UserNotDefinedException {
		return userDirectoryService.getUserByEid(matricule);
	}

	@Override
	public List<Site> getUserSites(User user) {
		return siteService.getUserSites(true, user.getId());
	}

	public void setUserDirectoryService(UserDirectoryService userDirectoryService) {
		this.userDirectoryService = userDirectoryService;
	}

	public void setSiteService(SiteService siteService) {
		this.siteService = siteService;
	}

	public void setGradebookService(GradebookService gradebookService) {
		this.gradebookService = gradebookService;
	}
}
