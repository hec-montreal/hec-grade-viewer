package ca.hec.gradeviewer.tool.entities;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class GradesResponse {

	private String userId;
	private List<Site> sites;

	public void setSites(List<org.sakaiproject.site.api.Site> sakaiSites) {
		sites = new ArrayList<>();

		for (org.sakaiproject.site.api.Site site : sakaiSites) {
			sites.add(new Site(site.getId(), site.getTitle()));
		}
	}
}
