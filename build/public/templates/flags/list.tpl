<div class="row">
	<div class="col-sm-4 col-md-3">
		<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">[[flags:quick-filters]]</h3>
	</div>
	<div class="panel-body">
		<ul>
			<li><a href="{config.relative_path}/flags?quick=mine">[[flags:filter-quick-mine]]</a></li>
		</ul>
	</div>
</div>

<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">[[flags:filters]]</h3>
	</div>
	<div class="panel-body">
		<form role="form" component="flags/filters">
			<div class="form-group">
				<label for="filter-state">[[flags:filter-state]]</label>
				<select class="form-control" id="filter-state" name="state">
					<option value="">[[flags:state-all]]</option>
					<option value="open">[[flags:state-open]]</option>
					<option value="wip">[[flags:state-wip]]</option>
					<option value="resolved">[[flags:state-resolved]]</option>
					<option value="rejected">[[flags:state-rejected]]</option>
				</select>
			</div>

			<div class="form-group">
				<label for="filter-type">[[flags:filter-type]]</label>
				<select class="form-control" id="filter-type" name="type">
					<option value="">[[flags:filter-type-all]]</option>
					<option value="post">[[flags:filter-type-post]]</option>
				</select>
			</div>

			<div class="form-group">
				<label for="filter-assignee">[[flags:filter-assignee]]</label>
				<input type="number" class="form-control" id="filter-assignee" name="assignee" min="0" />
			</div>

			<div class="form-group">
				<label for="filter-cid">[[flags:filter-cid]]</label>
				<select class="form-control" id="filter-cid" name="cid" multiple="true">
					<option value="">[[flags:filter-cid-all]]</option>
					<!-- BEGIN categories -->
					<option value="@key">@value</option>
					<!-- END categories -->
				</select>
			</div>

			<div class="form-group">
				<label for="filter-targetUid">[[flags:filter-targetUid]]</label>
				<input type="number" class="form-control" id="filter-targetUid" name="targetUid" min="0" />
			</div>

			<div class="form-group">
				<label for="filter-reporterId">[[flags:filter-reporterId]]</label>
				<input type="number" class="form-control" id="filter-reporterId" name="reporterId" min="0" />
			</div>

			<button type="button" class="btn btn-primary btn-block">[[flags:apply-filters]]</button>
		</form>
	</div>
</div>
	</div>
	<div class="col-sm-8 col-md-9">
		<div class="text-center">
			<div class="panel panel-default">
				<div class="panel-body">
					<div><canvas id="flags:daily" height="250"></canvas></div>
					<p>

					</p>
				</div>
				<div class="panel-footer"><small>Daily flags</small></div>
			</div>
		</div>

		<!-- IF hasFilter -->
		<div class="alert alert-warning">
			<p class="pull-right">
				<a href="{config.relative_path}/flags">[[flags:filter-reset]]</a>
			</p>
			[[flags:filter-active]]
		</div>
		<!-- ENDIF hasFilter -->
		<table class="table table-striped table-hover" component="flags/list">
			<thead>
				<tr>
					<th>[[flags:state]]</th>
					<th></th>
					<th><span class="hidden-xs">[[flags:reporter]] </span><i class="fa fa-user-plus"></i></th>
					<th><span class="hidden-xs">[[flags:reported-at]] </span><i class="fa fa-clock-o"></i></th>
				</tr>
			</thead>
			<tbody>
				<!-- IF !flags.length -->
				<tr>
					<td colspan="4">
						<div class="alert alert-success text-center">
							[[flags:no-flags]]
						</div>
					</td>
				</tr>
				<!-- ENDIF !flags.length -->
				<!-- BEGIN flags -->
				<tr data-flag-id="{../flagId}">
					<td><span class="label label-{../labelClass}">[[flags:state-{../state}]]</span></td>
					<td>
						<a href="{config.relative_path}/flags/{../flagId}">
							<strong>{../target_readable}</strong> &mdash; <span component="flags/list/description">{../description}</span>
						</a>
					</td>
					<td>
						<!-- IF ../reporter.picture -->
						<img class="avatar avatar-sm" src="{../reporter.picture}" />
						<!-- ELSE -->
						<div class="avatar avatar-sm" style="background-color: {../reporter.icon:bgColor};">{../reporter.icon:text}</div>
						<!-- ENDIF ../reporter.picture -->
						{../reporter.username}
					</td>
					<td><span class="timeago" title="{../datetimeISO}"></span></td>
				</tr>
				<!-- END flags -->
			</tbody>
		</table>
	</div>
</div>
