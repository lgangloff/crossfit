package org.crossfit.app.web.filter;


import org.apache.commons.lang.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;

import java.io.IOException;

/**
 * This filter is used in production, to serve static resources generated by "grunt build".
 * <p/>
 * <p>
 * It is configured to serve resources from the "dist" directory, which is the Grunt
 * destination directory.
 * </p>
 */
public class SubDomainFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Nothing to initialize
    }

    @Override
    public void destroy() {
        // Nothing to destroy
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String contextPath = ((HttpServletRequest) request).getContextPath();
        String requestURI = httpRequest.getRequestURI();
        requestURI = StringUtils.substringAfter(requestURI, contextPath);
        if (StringUtils.equals("/", requestURI)) {
            String[] domains = httpRequest.getServerName().split("\\.");
            
			String subdomain = domains.length > 0 ? domains[0] : httpRequest.getServerName();
			
			if (subdomain.equals("admin")){
	            request.getRequestDispatcher("/booking.admin.html").forward(request, response);
	            return;
			}
			else if(subdomain.equals("booking")){
	            request.getRequestDispatcher("/booking.html").forward(request, response);
	            return;
			}
			else if(subdomain.equals("root")){
	            request.getRequestDispatcher("/superadmin.html").forward(request, response);
	            return;
			}

        }
        
        chain.doFilter(request, response);
    }
}