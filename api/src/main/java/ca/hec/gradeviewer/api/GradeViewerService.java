package ca.hec.gradeviewer.api;

import java.util.List;

import org.sakaiproject.site.api.Site;
import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserNotDefinedException;

public interface GradeViewerService {

	public User getUserByMatricule(String matricule) throws UserNotDefinedException;

	public List<Site> getUserSites(User user);

	public List<AssignmentWithGrade> getUserAssignments(User user);
}
